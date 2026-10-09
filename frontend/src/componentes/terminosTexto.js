// ── Términos y Condiciones de Uso + Política de Tratamiento de Datos (fuente ÚNICA) ──
// La app los muestra con <TextoTerminos> (src/Terminos.jsx) y `node pruebas/exportar_terminos.mjs` genera el .md
// legal en 01_analisis_requisitos/legal/. Al cambiar el texto, sube TERMINOS_VERSION: a quien tenga una versión
// anterior se le muestra el aviso «Actualizamos los Términos» (modelo de aceptación por conducta inequívoca).
// Cada párrafo es un texto o { lista: [...] }.
export const TERMINOS_VERSION = '2026-10-09'
export const TERMINOS_FECHA = '9 de octubre de 2026'

export function terminos(soporte) {
  const canal = /^3\d{9}$/.test(soporte || '') ? `el WhatsApp de soporte ${soporte}` : 'el WhatsApp de soporte que aparece en la app'
  return [
    { t: 'Quiénes somos', p: [
      'Fixi Mandados («Fixi», «la Plataforma») es una aplicación web operada por MyS SinergiaaS (en adelante, «MyS SinergiaaS» o «el Operador»), con domicilio en Valencia, Córdoba (Colombia).',
      `Canal de atención para consultas, quejas, reclamos y temas de datos personales: ${canal} y la opción «Mi cuenta» de la app.`,
      'En este documento, «Cliente» es quien publica un pedido; «Trabajador» es quien lo atiende (incluye a quien conduce un vehículo); ambos son «Usuarios».',
    ] },
    { t: '1. Aceptación de estos términos', p: [
      'Al tocar «Entrar y pedir», «Continuar» o cualquier botón junto al aviso «Al continuar, aceptas los Términos y Condiciones», o al seguir usando Fixi después de un aviso de actualización, el Usuario declara que leyó, entendió y acepta este documento. Esa aceptación es un mensaje de datos con plena validez jurídica (Ley 527 de 1999). Fixi guarda la versión aceptada y la fecha.',
      'Si no está de acuerdo, el Usuario no debe registrarse ni usar la Plataforma. MyS SinergiaaS puede actualizar estos términos y avisará en la app antes de que empiecen a aplicarse.',
    ] },
    { t: '2. Naturaleza jurídica de la Plataforma', p: [
      'Fixi es EXCLUSIVAMENTE un portal de contacto e intermediación tecnológica: una herramienta digital que pone en contacto a Clientes que necesitan un mandado o un acarreo con Trabajadores independientes que ofrecen hacerlo, en los términos del artículo 53 de la Ley 1480 de 2011 (Estatuto del Consumidor).',
      'MyS SinergiaaS NO es una empresa de transporte de pasajeros ni de carga, NO está constituida ni habilitada como tal conforme a la Ley 336 de 1996 y al Decreto 1079 de 2015, y NO presta por sí misma servicios de transporte, mensajería, domicilios ni acarreo. No es propietaria, arrendataria ni tenedora de los vehículos, no asigna rutas obligatorias y no ejerce el control de la operación del servicio.',
      'El servicio lo presta el Trabajador directamente al Cliente, en virtud de un acuerdo entre ellos dos. El precio lo pactan Cliente y Trabajador: el valor que muestra la app es solo una sugerencia de referencia y cualquiera de los dos puede ofrecer otro.',
      'La comisión que cobra el Operador remunera el uso de la herramienta tecnológica (publicación, contacto, seguimiento, verificación de identidad y billetera), no el servicio de transporte ni el mandado.',
    ] },
    { t: '3. Servicios disponibles', p: [
      'En esta versión, Fixi habilita únicamente: (a) Mandados: compras, diligencias, pagos y entregas de objetos; y (b) Acarreos: traslado de objetos y carga liviana en vehículos aptos para carga.',
      'El transporte de personas NO está disponible. Otros módulos (por ejemplo, tareas o directorio de expertos) solo se ofrecen cuando aparecen activos en la app.',
    ] },
    { t: '4. Registro y verificación', p: [
      'Para usar Fixi se requiere ser mayor de 18 años, dar datos verdaderos y mantenerlos actualizados. La cuenta es personal e intransferible; el Usuario responde por lo que se haga desde ella.',
      'Los Trabajadores deben verificar su identidad (cédula, selfie y demás datos que pida la app) antes de atender pedidos. Así Fixi cumple el deber del artículo 53 de la Ley 1480 de 2011 de identificar a quienes ofrecen servicios: el nombre, la identificación y el teléfono del Trabajador podrán darse al Cliente que lo contrató para presentar una queja o reclamo, y a las autoridades que lo soliciten.',
      'Las insignias y niveles (Básico, Confiable, Certificado) reflejan la información que el Trabajador aportó y las revisiones que la app pudo hacer; no son una garantía de comportamiento futuro.',
    ] },
    { t: '5. Inexistencia de relación laboral', p: [
      'Los Trabajadores son personas independientes y usuarios de la Plataforma. Deciden libremente si se conectan, cuándo, cuánto tiempo, qué pedidos aceptan o rechazan, qué precio ofrecen, qué ruta siguen y con qué medios propios trabajan. No tienen horario, jefe, metas obligatorias ni exclusividad: pueden usar otras plataformas o trabajar por su cuenta.',
      'En consecuencia, entre MyS SinergiaaS y los Trabajadores NO existe contrato de trabajo, subordinación ni dependencia (artículos 22 y 23 del Código Sustantivo del Trabajo), ni sociedad, agencia o representación. El Trabajador no actúa en nombre de Fixi.',
      'Cada Trabajador es responsable de sus impuestos, de su licencia de conducción, del SOAT, la revisión técnico-mecánica y los demás documentos de su vehículo, y de su afiliación a la seguridad social como independiente, sin perjuicio de las obligaciones que la ley asigne a las plataformas digitales (en particular, la Ley 2466 de 2025 y su reglamentación sobre trabajadores digitales de reparto), que MyS SinergiaaS cumplirá en la medida en que le sean aplicables.',
    ] },
    { t: '6. Responsabilidad sobre la carga, los mandados y los acarreos', p: [
      'El acuerdo de servicio, su precio, la forma de entrega y cualquier garantía se pactan única y exclusivamente entre el Cliente y el Trabajador. El Trabajador responde ante el Cliente por la custodia y la entrega de lo que recibe.',
      'Fixi no recibe, empaca, inspecciona, custodia ni transporta mercancía, y no es remitente, destinatario ni transportador. Por eso MyS SinergiaaS no responde por pérdidas, daños, hurtos, demoras, faltantes o el estado de los objetos, ni por la calidad de las compras encargadas.',
      'Fixi sí se compromete a colaborar: entregar al Cliente afectado los datos de identificación del Trabajador, conservar el historial del pedido y del seguimiento GPS, suspender cuentas y atender a las autoridades.',
      'Recomendaciones: describe bien el contenido, toma fotos antes de entregar, empaca adecuadamente, no envíes objetos de alto valor y da el código de 4 números SOLO cuando hayas recibido el servicio completo.',
      'Las exclusiones de este documento se aplican en la medida permitida por la ley y no limitan los derechos irrenunciables que la Ley 1480 de 2011 reconoce a los consumidores, ni la responsabilidad del Operador por su propio dolo o culpa grave.',
    ] },
    { t: '7. Artículos y usos prohibidos', p: [
      'El Cliente declara, al publicar cada pedido, que lo que se compra, recoge o transporta es de procedencia y contenido legal y que tiene derecho a disponer de ello. Queda estrictamente prohibido usar Fixi para comprar, recoger, guardar o mover:',
      { lista: [
        'Sustancias estupefacientes, psicotrópicas o ilícitas, y sus precursores (Ley 30 de 1986).',
        'Armas de fuego, municiones, explosivos, pólvora o sus partes (Decreto 2535 de 1993), y armas blancas fuera de su uso doméstico.',
        'Dinero en efectivo, títulos valores, joyas o metales preciosos por un valor superior a un (1) salario mínimo mensual legal vigente, salvo el dinero estrictamente necesario para la compra encargada y declarado en el pedido.',
        'Mercancía hurtada, de contrabando, falsificada o sin factura cuando la ley la exija.',
        'Materiales peligrosos: inflamables, corrosivos, tóxicos, radiactivos o cilindros de gas sin las condiciones de seguridad exigidas.',
        'Fauna o flora silvestre, y especies protegidas.',
        'Medicamentos de control sin fórmula médica, y bebidas alcohólicas o tabaco para menores de edad.',
        'Documentos de identidad ajenos o cualquier otro bien u operación contraria a la ley.',
      ] },
      'El Trabajador puede y debe negarse a recibir algo si sospecha que está prohibido, y puede pedir ver el contenido antes de aceptarlo. Fixi suspenderá las cuentas involucradas y pondrá la información a disposición de las autoridades. Quien infrinja esta cláusula responde personalmente por los daños causados y por las consecuencias legales.',
    ] },
    { t: '8. Prohibición del transporte de personas', p: [
      'Está prohibido usar las categorías de Mandados o Acarreos para transportar personas, incluidas las que «acompañan la carga», ayudantes que viajan en el vehículo o menores de edad. Un acarreo es solo para objetos.',
      'Los pedidos que camuflen transporte de personas serán cancelados y las cuentas suspendidas. MyS SinergiaaS no responde por ese uso indebido: el Cliente y el Trabajador que lo realicen asumen las sanciones que imponga la autoridad de transporte y cualquier daño a las personas transportadas.',
      'En una emergencia médica o de seguridad, llama a la línea 123.',
    ] },
    { t: '9. Pagos, comisión y saldo prepago', p: [
      'El Cliente paga el servicio directamente al Trabajador, en efectivo o por el medio que ambos acuerden. El código de 4 números confirma que el servicio terminó.',
      'El Trabajador paga a Fixi una comisión por el uso de la herramienta, que se descuenta de su saldo prepago cuando se le asigna un pedido. Las tarifas vigentes se informan en la app antes de aceptar.',
      'El saldo de la billetera y los puntos o «Fixis» son un saldo prepago de circuito cerrado: solo sirven dentro de la Plataforma, no son depósito ni dinero electrónico, no generan intereses y no se redimen en efectivo. Las recargas se confirman manualmente; cualquier error se atiende por el canal de soporte.',
    ] },
    { t: '10. Conducta y contenido', p: [
      'Los Usuarios se tratan con respeto. Está prohibido publicar contenido sexual, violento, discriminatorio o engañoso, y compartir datos de contacto en los textos públicos para cerrar el servicio por fuera de la app. Fixi revisa textos y fotos automáticamente, recibe reportes y puede retirar contenido.',
      'MyS SinergiaaS puede suspender o cerrar una cuenta que incumpla estos términos, que ponga en riesgo a otros Usuarios o que tenga indicios de fraude, y conservar la información necesaria para atender reclamos y requerimientos de autoridades.',
    ] },
    { t: '11. Disponibilidad y límites del servicio tecnológico', p: [
      'Fixi se ofrece «tal como está» y puede tener interrupciones por mantenimiento, fallas de internet, del GPS o de los proveedores tecnológicos. El precio sugerido, la distancia y el tiempo estimado son aproximados. MyS SinergiaaS no garantiza que siempre haya un Trabajador disponible.',
    ] },
    { t: '12. Tratamiento de datos personales (Habeas Data)', p: [
      'MyS SinergiaaS es Responsable del tratamiento de los datos personales que se recogen en Fixi, conforme a la Ley Estatutaria 1581 de 2012 y al Decreto 1074 de 2015 (Capítulo 25, que compila el Decreto 1377 de 2013).',
      'Datos que tratamos:',
      { lista: [
        'Identificación y contacto: nombre, celular, correo electrónico y, si lo verificas, tu WhatsApp.',
        'Ubicación (GPS): mientras pides o atiendes un servicio, para mostrar el seguimiento en vivo a la otra parte del pedido; y, si eres Trabajador y lo activas, tu zona aproximada para avisarte de pedidos cercanos.',
        'Datos de los pedidos: descripciones, direcciones, fotos adjuntas, precios, pujas, calificaciones, reportes y movimientos de la billetera.',
        'Perfil de Confianza (opcional para Clientes, necesario para trabajar): foto de la cédula, selfie, hoja de vida, certificados de antecedentes y datos del vehículo.',
        'Datos técnicos: identificador de notificaciones del dispositivo y métricas de uso agregadas, sin datos de identificación.',
      ] },
      'Finalidades: crear y proteger tu cuenta; poner en contacto a Clientes y Trabajadores; mostrar el seguimiento del servicio; verificar identidad y prevenir fraude, suplantación y usos prohibidos; enviar avisos del servicio; atender soporte, quejas y reclamos; cumplir obligaciones legales y requerimientos de autoridades; y mejorar la app con estadísticas agregadas.',
      'Datos sensibles: la selfie usada para comparar tu rostro es un dato biométrico, y por tanto sensible (artículo 5 de la Ley 1581). No estás obligado a autorizar su tratamiento; si decides verificarte, la app te pide una autorización expresa y separada en la pantalla de verificación. Los datos de menores de edad no se tratan: Fixi es solo para mayores de 18 años.',
      'Tus derechos (artículo 8 de la Ley 1581): conocer, actualizar y rectificar tus datos; pedir prueba de la autorización; saber cómo se usan; revocar la autorización y pedir que se borren cuando no exista un deber legal o contractual de conservarlos; acceder gratis a ellos; y presentar quejas ante la Superintendencia de Industria y Comercio después de agotar el trámite con nosotros.',
      `Cómo ejercerlos: escríbenos por ${canal}. Las consultas se responden en máximo diez (10) días hábiles y los reclamos en máximo quince (15) días hábiles (artículos 14 y 15 de la Ley 1581).`,
      'Proveedores y transferencia internacional: los datos se alojan en servicios de Google Firebase y Vercel, y los mapas usan OpenStreetMap; sus servidores pueden estar fuera de Colombia. Actúan como Encargados con medidas de seguridad propias. El Operador no vende tus datos.',
      'Quién ve qué: tu celular y tu ubicación en vivo solo los ve quien atiende (o pidió) tu pedido mientras está activo; los documentos de identidad solo los ve el administrador; la selfie aprobada y la hoja de vida de un Trabajador pueden aparecer en su perfil público.',
      'Conservación: mientras la cuenta esté activa y luego el tiempo necesario para atender reclamos, obligaciones legales y requerimientos de autoridades.',
      'Autorización: al continuar con el registro, autorizas de manera previa, expresa e informada el tratamiento de tus datos para las finalidades descritas, mediante una conducta inequívoca (artículo 2.2.2.25.2.4 del Decreto 1074 de 2015).',
    ] },
    { t: '13. Ley aplicable y quejas', p: [
      'Estos términos se rigen por las leyes de la República de Colombia. Antes de acudir a otra instancia, te invitamos a escribirnos por el canal de soporte para buscar una solución directa. Como consumidor, conservas tu derecho de acudir a la Superintendencia de Industria y Comercio y a los jueces de Colombia.',
    ] },
  ]
}
