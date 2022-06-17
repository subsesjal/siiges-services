# RFCs
Los cambios, incluidas las correcciones de errores y las mejoras de la documentación, se pueden implementar y revisar a través del flujo de trabajo de pull request de GitHub.

Sin embargo, algunos cambios son "sustanciales", y pedimos que se sometan a un pequeño proceso de diseño y produzcan un consenso entre el equipo de desarrollo.

El proceso "RFC" (solicitud de comentarios) tiene como objetivo proporcionar una ruta coherente y controlada para que las nuevas funciones que ingresen al proyecto.

[Lista RFC activa](https://github.com/subsesjal/knowledge-base/pulls)

## Cuándo seguir este proceso
Debería considerar usar este proceso si tiene la intención de realizar cambios "sustanciales" en el proyecto. Algunos ejemplos que se beneficiarían de un RFC son:

- Una nueva función que crea una nueva área de API y que requeriría un feature flag.
- La eliminación de características que ya se enviaron como parte del canal de lanzamiento.
- La introducción de nuevos usos o convenciones idiomáticas, incluso si no incluyen cambios en el código.

Algunos cambios no requieren un RFC:
- Reformular, reorganizar o refactorizar
- Adición o eliminación de advertencias
- Adiciones que mejoran estrictamente los criterios de calidad numéricos y objetivos (rapidez, mejor compatibilidad con el navegador)

## Cual es el proceso
En resumen, para agregar una función importante a los proyectos, generalmente primero se fusiona el RFC en el repositorio RFC como un archivo con extensión md. En ese momento, el RFC está 'activo' y puede implementarse con el objetivo de una eventual inclusión en los proyectos.

- Haga un fork al repositorio RFC https://github.com/subsesjal/knowledge-base
- Copia 0000-template.md a RFCs/accepted/0000-my-feature.md (donde 'my-feature' es la descripción del RFC. No asigne un número de RFC todavía).
- Llene el RFC. Preste atención a los detalles: **Los RFC que no presentan una motivación convincente, no demuestran comprensión del impacto del diseño o no son claros sobre los inconvenientes o las alternativas tienden a ser mal recibidos**.
- Envíe un pull request. Como es un pull request, el RFC recibirá comentarios de diseño de la comunidad, y el autor debe estar preparado para revisarlo en respuesta.
- Crear consenso e integrar la retroalimentación. Los RFC que cuentan con un amplio apoyo tienen muchas más probabilidades de progresar que aquellos que no reciben ningún comentario.
- Un RFC se puede modificar en función de los comentarios del equipo o la comunidad.
- Una RFC puede ser rechazada por el equipo después de que se haya resuelto la discusión pública y se hayan hecho comentarios que resuman la justificación del rechazo. Luego, un miembro del equipo debe cerrar el pull request asociado a los RFC y el RFC se "rechazará".
- Se puede aceptar un RFC. Un miembro del equipo fusionará el pull request asociado a los RFC, lo que significa que se aceptará el RFC y estará esperando su aprobación; en este punto, el RFC pasará a ser "aceptado".

## El ciclo de vida de RFC
Una vez que un RFC se activa, se iniciará un proceso de discusión y tendrá lugar en el RCF PR.

Una vez que se acepta un RFC, se puede implementar enviando un PR con la característica al repositorio del proyecto.

Además, el hecho de que un RFC dado haya sido aceptado y esté 'activo' no implica nada sobre qué prioridad se asigna a su implementación.

Las modificaciones de los RFC activos se pueden realizar en los PR de seguimiento. Nos esforzamos por escribir cada RFC de manera que refleje el diseño final de la característica; pero la naturaleza del proceso significa que no podemos esperar que cada RFC combinado refleje realmente cuál será el resultado final en el momento del próximo lanzamiento importante; por lo tanto, tratamos de mantener cada documento RFC sincronizado según lo planeado, rastreando dichos cambios a través de pull request de seguimiento al documento.

Una vez finalizada la implementación del RFC, se debe enviar un nuevo PR a este repositorio para cambiar el estado del RFC de aceptado a implementado. Una vez hecho esto, cualquier mejora o mejora relacionada con la característica debe venir con otro RFC.

## Implementando un RFC
El autor de un RFC no está obligado a implementarlo. Por supuesto, el autor de RFC (como cualquier otro desarrollador) puede publicar una implementación para su revisión después de que se haya aceptado el RFC.

Si está interesado en trabajar en la implementación de un RFC 'activo', pero no puede determinar si alguien más ya está trabajando en él, no dude en preguntar (por ejemplo, dejando un comentario sobre el problema asociado).

## Contribuciones
Gracias por estar aquí, estamos muy contentos de que haya decidido crear un RFC.

Antes de contribuir al proyecto, asegúrese de leer todos los elementos a continuación.

* [Guía colaboradora](https://github.com/subsesjal/knowledge-base/blob/main/RFCs/CONTRIBUTING.md)
* [Solicitud de comentarios recursos adicionales](https://www.notion.so/Request-for-comments-RFC-d63f23bf76c44d9aa7c39fed11d84c0f)

## Inspiración
El proceso de RFC debe su inspiración al proceso [React RFC process](https://github.com/reactjs/rfcs) y [Rust RFC process](https://github.com/rust-lang/rfcs).