const crypto = require('crypto');
const { auditContext, Logger } = require('@siiges-services/shared');
const EXCLUDED_MODELS = require('./audit-excluded-models');

const SENSITIVE_FIELD_PATTERN = /password|contrasena|token|secret/i;

// Campos con PII que NO deben duplicarse en texto plano en la bitácora,
// aunque el modelo sí se audite (a diferencia del regex, esto es por nombre exacto).
const FIELD_EXCLUSIONS = {
  Persona: ['curp', 'rfc', 'ine', 'telefono', 'celular', 'fechaNacimiento', 'fotografia'],
};

// Cualquier valor largo (payloads de firma XML/base64, TEXT grandes, etc.)
// se trunca a un hash + longitud en vez de duplicarse completo, sin importar
// si conocemos el nombre del campo de antemano.
const MAX_FIELD_LENGTH = 500;

const sanitizarValor = (modelName, key, value) => {
  if (SENSITIVE_FIELD_PATTERN.test(key)) return '[REDACTED]';
  if (FIELD_EXCLUSIONS[modelName]?.includes(key)) return '[OMITIDO:PII]';
  if (typeof value === 'string' && value.length > MAX_FIELD_LENGTH) {
    const hash = crypto.createHash('sha256').update(value).digest('hex').slice(0, 12);
    return `[TRUNCADO ${value.length} chars, sha256:${hash}]`;
  }
  return value;
};

const sanitizar = (modelName, obj) => {
  if (!obj) return obj;
  const limpio = {};
  Object.entries(obj).forEach(([key, value]) => {
    limpio[key] = sanitizarValor(modelName, key, value);
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
        lugar: (store?.endpoint || 'proceso interno').slice(0, 255),
        requestId: store?.requestId || null,
        ...data,
      });
    } catch (err) {
      Logger.error(`[audit-log] No se pudo guardar el log: ${err.message}`, { data });
    }
  };

  const logCreate = async (instance) => {
    const entidad = instance.constructor.name;
    if (EXCLUDED_MODELS.includes(entidad)) return;
    await saveLog({
      accion: 'CREATE',
      entidad,
      registroId: instance.id,
      datosAnteriores: null,
      datosNuevos: sanitizar(entidad, instance.toJSON()),
    });
  };

  const logUpdate = async (instance) => {
    const entidad = instance.constructor.name;
    if (EXCLUDED_MODELS.includes(entidad)) return;

    const cambios = (instance.changed() || []).filter((c) => c !== 'updatedAt');
    if (!cambios.length) return;

    const esBajaLogica = cambios.includes('deletedAt')
      && instance.get('deletedAt')
      && !instance.previous('deletedAt');

    if (esBajaLogica) {
      await saveLog({
        accion: 'DELETE',
        entidad,
        registroId: instance.id,
        datosAnteriores: sanitizar(entidad, snapshotAnterior(instance)),
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
      entidad,
      registroId: instance.id,
      datosAnteriores: sanitizar(entidad, anteriores),
      datosNuevos: sanitizar(entidad, nuevos),
    });
  };

  const logDestroy = async (instance) => {
    const entidad = instance.constructor.name;
    if (EXCLUDED_MODELS.includes(entidad)) return;
    await saveLog({
      accion: 'DELETE',
      entidad,
      registroId: instance.id,
      datosAnteriores: sanitizar(entidad, instance.toJSON()),
      datosNuevos: null,
    });
  };

  sequelize.addHook('afterCreate', logCreate);
  sequelize.addHook('afterUpdate', logUpdate);
  sequelize.addHook('beforeDestroy', logDestroy);
};

module.exports = registerAuditHooks;
