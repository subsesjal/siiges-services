const { auditContext } = require('@siiges-services/shared');

const EXCLUDED_MODELS = [
  'Bitacora',
  'Sesion',
  'TokenRecoveryPassword',
  'TokenExterno',
  'TokenServiciosExternos',
  'Notificacion',
  'Respaldo',
];

const SENSITIVE_FIELD_PATTERN = /password|contrasena|token|secret/i;

const redactar = (obj) => {
  if (!obj) return obj;
  const limpio = {};
  Object.entries(obj).forEach(([key, value]) => {
    limpio[key] = SENSITIVE_FIELD_PATTERN.test(key) ? '[REDACTED]' : value;
  });
  return limpio;
};

const snapshotAnterior = (instance) => {
  const atributos = Object.keys(instance.constructor.rawAttributes || {});
  const snapshot = {};
  atributos.forEach((campo) => {
    snapshot[campo] = instance.previous(campo);
  });
  return snapshot;
};

const registerAuditHooks = (sequelize) => {
  const saveLog = async (data) => {
    try {
      const store = auditContext.getStore();
      await sequelize.models.Bitacora.create({
        usuarioId: store?.usuarioId || null,
        lugar: store?.endpoint || 'proceso interno',
        requestId: store?.requestId || null,
        ...data,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[audit-log] No se pudo guardar el log:', err.message);
    }
  };

  const logCreate = async (instance) => {
    if (EXCLUDED_MODELS.includes(instance.constructor.name)) return;
    await saveLog({
      accion: 'CREATE',
      entidad: instance.constructor.name,
      registroId: instance.id,
      datosAnteriores: null,
      datosNuevos: redactar(instance.toJSON()),
    });
  };

  const logUpdate = async (instance) => {
    if (EXCLUDED_MODELS.includes(instance.constructor.name)) return;

    const cambios = (instance.changed() || []).filter((c) => c !== 'updatedAt');
    if (!cambios.length) return;

    const esBajaLogica = cambios.includes('deletedAt')
      && instance.get('deletedAt')
      && !instance.previous('deletedAt');

    if (esBajaLogica) {
      await saveLog({
        accion: 'DELETE',
        entidad: instance.constructor.name,
        registroId: instance.id,
        datosAnteriores: redactar(snapshotAnterior(instance)),
        datosNuevos: null,
      });
      return;
    }

    const anteriores = {};
    const nuevos = {};
    cambios.forEach((campo) => {
      anteriores[campo] = instance.previous(campo);
      nuevos[campo] = instance.get(campo);
    });

    await saveLog({
      accion: 'UPDATE',
      entidad: instance.constructor.name,
      registroId: instance.id,
      datosAnteriores: redactar(anteriores),
      datosNuevos: redactar(nuevos),
    });
  };

  const logDestroy = async (instance) => {
    if (EXCLUDED_MODELS.includes(instance.constructor.name)) return;
    await saveLog({
      accion: 'DELETE',
      entidad: instance.constructor.name,
      registroId: instance.id,
      datosAnteriores: redactar(instance.toJSON()),
      datosNuevos: null,
    });
  };

  sequelize.addHook('afterCreate', logCreate);
  sequelize.addHook('afterUpdate', logUpdate);
  sequelize.addHook('beforeDestroy', logDestroy);
};

module.exports = registerAuditHooks;
