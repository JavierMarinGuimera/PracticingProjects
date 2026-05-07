import type { CategoryPage, CategorySlug } from "@/types/category";

export const serviceCategories: CategoryPage[] = [
  {
    slug: "reparacion-turbos",
    title: "Reparación de Turbos",
    metaTitle: "Reparación de turbos en Barcelona | Diagnóstico y garantía",
    metaDescription:
      "Servicio técnico de reparación de turbos para coche y vehículo industrial. Diagnóstico, actuadores, geometría variable y prueba final en Barcelona.",
    description:
      "Diagnóstico y reparación de turbos para motores diésel y gasolina con prueba de funcionamiento antes de la entrega.",
    h1: "Reparación de turbos con diagnóstico técnico",
    intro:
      "Reparamos turbos con fallos de presión, silbidos, consumo de aceite, pérdida de potencia o errores de actuador. El objetivo es recuperar el rendimiento del conjunto sin vender piezas innecesarias.",
    image: "/images/flowline-automation-cell.jpg",
    imageAlt: "Banco de trabajo para reparación técnica de turbos de automóvil.",
    symptoms: [
      "Pérdida de potencia al acelerar",
      "Silbido anormal en el turbo",
      "Humo azul o negro por el escape",
      "Modo emergencia y errores de presión",
    ],
    commonFailures: [
      "Geometría variable bloqueada por carbonilla",
      "Actuador electrónico dañado",
      "Holgura en el eje o desgaste de casquillos",
      "Fugas de aceite en admisión o escape",
    ],
    brands: ["Garrett", "BorgWarner", "Mitsubishi", "IHI", "Toyota", "Volkswagen"],
    models: ["TDI", "HDI", "CDI", "dCi", "JTD", "EcoBoost"],
    process: [
      "Recepción del turbo y comprobación visual",
      "Diagnóstico de actuador, presión y estado mecánico",
      "Reparación, limpieza técnica y sustitución de componentes dañados",
      "Prueba final y asesoramiento de montaje",
    ],
    warranty:
      "Todas las reparaciones se entregan con garantía sobre el trabajo realizado, condicionada a una instalación correcta y circuito de lubricación limpio.",
    faq: [
      {
        question: "¿Cuándo merece la pena reparar un turbo?",
        answer:
          "Cuando la carcasa y el conjunto principal permiten recuperación técnica. Tras el diagnóstico confirmamos si es viable reparar o si conviene sustituir.",
      },
      {
        question: "¿La reparación incluye el actuador electrónico?",
        answer:
          "Podemos revisar y reparar actuadores cuando el fallo lo permite. Si el actuador no es recuperable, se propone una solución compatible.",
      },
      {
        question: "¿Trabajáis con clientes de fuera de Barcelona?",
        answer:
          "Sí. Atendemos consultas y envíos desde Sabadell, Terrassa, Hospitalet, Girona, Tarragona y otras zonas.",
      },
    ],
    related: ["centralitas-motor", "reparacion-mecatronica-dsg", "compresores-aire-acondicionado"],
  },
  {
    slug: "reparacion-modulos-abs",
    title: "Reparación de Módulos ABS",
    metaTitle: "Reparación de módulos ABS | Fallos ESP, bomba ABS y centralita",
    metaDescription:
      "Reparamos módulos ABS y unidades ESP con fallos de comunicación, bomba, sensores y averías electrónicas. Servicio técnico en Barcelona.",
    description:
      "Reparación de módulos ABS, unidades ESP y bombas hidráulicas con diagnóstico electrónico y prueba funcional.",
    h1: "Reparación de módulos ABS y unidades ESP",
    intro:
      "Diagnosticamos fallos de ABS y ESP para recuperar la unidad original del vehículo cuando es técnicamente viable. Esto evita codificaciones innecesarias y reduce tiempos de inmovilización.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Electrónica de módulo ABS en proceso de reparación.",
    symptoms: [
      "Testigo ABS o ESP encendido",
      "Error de comunicación con unidad ABS",
      "Bomba hidráulica sin respuesta",
      "Fallo intermitente después de circular",
    ],
    commonFailures: [
      "Soldaduras internas fatigadas",
      "Motor de bomba ABS bloqueado",
      "Fallo de alimentación o masa",
      "Unidad electrónica dañada por humedad",
    ],
    brands: ["Bosch", "ATE", "Continental", "TRW", "Teves", "Volkswagen"],
    models: ["Golf", "A3", "Serie 1", "Clase C", "Focus", "Leon"],
    process: [
      "Lectura de errores y referencia de la unidad",
      "Comprobación electrónica e hidráulica",
      "Reparación de placa, motor o contactos afectados",
      "Prueba de comunicación y recomendaciones de montaje",
    ],
    warranty:
      "La garantía cubre el fallo reparado en la unidad ABS. No cubre sensores externos, cableado del vehículo o averías hidráulicas ajenas.",
    faq: [
      {
        question: "¿Se pierde la codificación del módulo ABS?",
        answer:
          "Al reparar la unidad original normalmente se conserva la codificación del vehículo, lo que simplifica el montaje.",
      },
      {
        question: "¿Puedo enviar solo la parte electrónica?",
        answer:
          "Depende de la referencia. En algunos módulos es suficiente la electrónica; en otros necesitamos el conjunto completo para probar.",
      },
      {
        question: "¿Reparáis fallos intermitentes?",
        answer:
          "Sí, pero necesitamos la referencia y los códigos de avería para reproducir el síntoma y confirmar viabilidad.",
      },
    ],
    related: ["centralitas-motor", "direccion-electrica", "suspension-neumatica"],
  },
  {
    slug: "reparacion-mecatronica-dsg",
    title: "Reparación de Mecatrónica DSG",
    metaTitle: "Reparación mecatrónica DSG | 6 y 7 velocidades",
    metaDescription:
      "Servicio técnico para reparación de mecatrónica DSG con tirones, fallos de presión, errores de marcha y averías electrónicas.",
    description:
      "Diagnóstico y reparación de unidades mecatrónicas DSG para cajas automáticas de doble embrague.",
    h1: "Reparación de mecatrónica DSG",
    intro:
      "La mecatrónica DSG combina hidráulica, electrónica y control de cambio. Nuestro enfoque separa el fallo real de embrague, sensores, presión o unidad para evitar sustituciones completas cuando no son necesarias.",
    image: "/images/conveyor-transfer-suite.jpg",
    imageAlt: "Componente mecatrónico DSG preparado para diagnóstico.",
    symptoms: [
      "Tirones al cambiar de marcha",
      "Error PRNDS o marchas parpadeando",
      "El cambio entra en modo emergencia",
      "Pérdida de presión o fallo de acumulador",
    ],
    commonFailures: [
      "Fallos de solenoides",
      "Problemas de presión hidráulica",
      "Sensor de marcha o temperatura dañado",
      "Avería electrónica en la unidad de control",
    ],
    brands: ["Volkswagen", "Audi", "Seat", "Skoda", "BorgWarner", "LuK"],
    models: ["DQ200", "DQ250", "DQ381", "DQ500", "Golf DSG", "Audi S tronic"],
    process: [
      "Identificación exacta de referencia DSG",
      "Diagnóstico electrónico y comprobación de presión",
      "Reparación de componentes hidráulicos o electrónicos",
      "Prueba final y pautas de adaptación",
    ],
    warranty:
      "La garantía se aplica a la reparación realizada en la mecatrónica. La adaptación y el estado de embragues deben verificarse en el vehículo.",
    faq: [
      {
        question: "¿Reparáis DSG 6 y DSG 7?",
        answer:
          "Sí, trabajamos con referencias habituales de DSG de 6 y 7 velocidades, siempre tras comprobar la viabilidad técnica.",
      },
      {
        question: "¿Hace falta adaptar la caja después?",
        answer:
          "En muchos casos es recomendable realizar adaptación básica y comprobar valores de embrague tras montar la unidad.",
      },
      {
        question: "¿La avería puede ser de embrague y no de mecatrónica?",
        answer:
          "Sí. Por eso pedimos síntomas, códigos de error y referencia para orientar el diagnóstico antes de reparar.",
      },
    ],
    related: ["cambio-cvt-mercedes", "centralitas-motor", "reparacion-turbos"],
  },
  {
    slug: "direccion-electrica",
    title: "Dirección Eléctrica",
    metaTitle: "Reparación de dirección eléctrica EPS | Columnas y módulos",
    metaDescription:
      "Reparación de dirección eléctrica asistida, columnas EPS, módulos y fallos de asistencia. Servicio para Barcelona y alrededores.",
    description:
      "Servicio técnico para columnas de dirección eléctrica, módulos EPS y fallos de asistencia.",
    h1: "Reparación de dirección eléctrica asistida",
    intro:
      "Reparamos fallos de asistencia eléctrica, módulos EPS y columnas de dirección cuando el sistema permite recuperación. Priorizamos conservar la unidad original para reducir problemas de codificación.",
    image: "/images/modular-storage-system.jpg",
    imageAlt: "Columna de dirección eléctrica lista para reparación.",
    symptoms: [
      "Dirección dura de forma permanente",
      "Asistencia intermitente",
      "Testigo de volante encendido",
      "Ruido o fallo al girar en maniobras",
    ],
    commonFailures: [
      "Sensor de par defectuoso",
      "Motor de asistencia dañado",
      "Módulo EPS sin comunicación",
      "Conectores o soldaduras internas fatigadas",
    ],
    brands: ["TRW", "NSK", "JTEKT", "Delphi", "Fiat", "Renault"],
    models: ["Punto", "Corsa", "Clio", "Megane", "Astra", "Polo"],
    process: [
      "Comprobación de referencia y síntomas",
      "Diagnóstico de motor, sensor y electrónica",
      "Reparación o calibración según unidad",
      "Prueba funcional y recomendaciones de montaje",
    ],
    warranty:
      "La garantía cubre la reparación de la unidad. Es imprescindible revisar alimentación, masas, batería y alternador del vehículo.",
    faq: [
      {
        question: "¿Se puede reparar una columna de dirección eléctrica?",
        answer:
          "En muchas referencias sí. Confirmamos viabilidad tras revisar referencia, síntomas y estado físico de la unidad.",
      },
      {
        question: "¿Necesita codificación después de reparar?",
        answer:
          "Al conservar la unidad original normalmente se reduce la necesidad de codificación, aunque algunas referencias requieren calibración.",
      },
      {
        question: "¿Atendéis talleres de Terrassa o Sabadell?",
        answer:
          "Sí, trabajamos con talleres y particulares de Barcelona, Sabadell, Terrassa, Hospitalet, Girona y Tarragona.",
      },
    ],
    related: ["reparacion-modulos-abs", "centralitas-motor", "suspension-neumatica"],
  },
  {
    slug: "centralitas-motor",
    title: "Centralitas de Motor",
    metaTitle: "Reparación de centralitas de motor ECU | Diagnóstico electrónico",
    metaDescription:
      "Reparación de centralitas de motor ECU con fallos de arranque, comunicación, inyección o alimentación. Servicio técnico especializado.",
    description:
      "Diagnóstico y reparación de centralitas ECU para fallos de motor, arranque, inyección y comunicación.",
    h1: "Reparación de centralitas de motor ECU",
    intro:
      "La ECU controla sistemas críticos del motor. Analizamos alimentación, comunicación, memoria y salidas de control para reparar la unidad original siempre que sea posible.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Centralita de motor ECU sobre banco de diagnóstico electrónico.",
    symptoms: [
      "El vehículo no arranca",
      "No hay comunicación con la ECU",
      "Fallos de inyectores o bobinas",
      "Averías después de humedad o cortocircuito",
    ],
    commonFailures: [
      "Daños por agua o sulfatación",
      "Etapas de potencia quemadas",
      "Fallo de alimentación interna",
      "Problemas de memoria o comunicación CAN",
    ],
    brands: ["Bosch", "Siemens", "Delphi", "Magneti Marelli", "Denso", "Continental"],
    models: ["EDC16", "EDC17", "ME7", "MED17", "SID", "PCR"],
    process: [
      "Identificación de referencia ECU",
      "Diagnóstico en banco y revisión de placa",
      "Reparación electrónica y comprobación de comunicación",
      "Informe de viabilidad y pautas de instalación",
    ],
    warranty:
      "La garantía cubre el defecto reparado en la ECU. Antes de montar se deben revisar sensores, actuadores y cableado que pudieron causar el fallo.",
    faq: [
      {
        question: "¿Es mejor reparar la ECU original?",
        answer:
          "Cuando es viable, reparar la ECU original evita problemas de inmovilizador, codificación y compatibilidad.",
      },
      {
        question: "¿Podéis reparar una centralita mojada?",
        answer:
          "Depende del nivel de corrosión. Cuanto antes se revise, más posibilidades hay de recuperación.",
      },
      {
        question: "¿Necesitáis el coche completo?",
        answer:
          "No siempre. Muchas comprobaciones se realizan con la unidad y la información de referencia, síntomas y errores.",
      },
    ],
    related: ["reparacion-turbos", "reparacion-modulos-abs", "direccion-electrica"],
  },
  {
    slug: "compresores-aire-acondicionado",
    title: "Compresores de Aire Acondicionado",
    metaTitle: "Reparación de compresores de aire acondicionado de coche",
    metaDescription:
      "Servicio técnico para compresores de aire acondicionado automotriz: polea, embrague, válvula, fugas y fallos de presión.",
    description:
      "Reparación de compresores de aire acondicionado para turismos y vehículo industrial ligero.",
    h1: "Reparación de compresores de aire acondicionado",
    intro:
      "Un compresor de A/C puede fallar por desgaste, falta de lubricación, válvula de control o contaminación del circuito. Diagnosticamos el origen para reparar con criterio técnico.",
    image: "/images/inox-process-manifold.jpg",
    imageAlt: "Compresor de aire acondicionado de coche en banco de trabajo.",
    symptoms: [
      "El aire acondicionado no enfría",
      "Ruidos al conectar el compresor",
      "Presión incorrecta en el circuito",
      "Embrague o polea sin accionamiento",
    ],
    commonFailures: [
      "Válvula reguladora bloqueada",
      "Embrague electromagnético dañado",
      "Fuga por retenes",
      "Gripaje por falta de aceite o contaminación",
    ],
    brands: ["Denso", "Sanden", "Delphi", "Valeo", "Mahle", "Hella"],
    models: ["Audi", "BMW", "Mercedes", "Volkswagen", "Peugeot", "Renault"],
    process: [
      "Inspección del compresor y referencia",
      "Comprobación de embrague, polea, válvula y fugas",
      "Reparación o sustitución de componentes internos",
      "Recomendaciones para limpieza y carga del circuito",
    ],
    warranty:
      "La garantía requiere montaje con circuito limpio, filtro deshidratador revisado y carga correcta de aceite y gas.",
    faq: [
      {
        question: "¿Siempre hay que cambiar el compresor completo?",
        answer:
          "No. En muchos casos se puede reparar el componente responsable si el cuerpo y el circuito lo permiten.",
      },
      {
        question: "¿Puede fallar de nuevo si no se limpia el circuito?",
        answer:
          "Sí. Si hay limaduras o contaminación, es imprescindible limpiar el circuito antes de montar el compresor reparado.",
      },
      {
        question: "¿Reparáis compresores de marcas premium?",
        answer:
          "Trabajamos con referencias habituales de Audi, BMW, Mercedes, Volkswagen y otros fabricantes.",
      },
    ],
    related: ["reparacion-turbos", "centralitas-motor", "suspension-neumatica"],
  },
  {
    slug: "suspension-neumatica",
    title: "Suspensión Neumática",
    metaTitle: "Reparación de suspensión neumática | Compresores y módulos",
    metaDescription:
      "Diagnóstico y reparación de suspensión neumática: compresores, bloques de válvulas, balonas y fallos de altura en Barcelona.",
    description:
      "Servicio técnico para compresores, módulos y componentes de suspensión neumática.",
    h1: "Reparación de suspensión neumática",
    intro:
      "Los sistemas de suspensión neumática requieren diagnóstico preciso: una fuga, un compresor fatigado o un bloque de válvulas puede generar síntomas parecidos. Revisamos el conjunto para reparar la causa real.",
    image: "/images/modular-storage-system.jpg",
    imageAlt: "Sistema de suspensión neumática preparado para diagnóstico.",
    symptoms: [
      "El vehículo baja de un lado",
      "Compresor funcionando demasiado tiempo",
      "Error de altura o suspensión",
      "Modo emergencia en suspensión",
    ],
    commonFailures: [
      "Fugas en balonas o tuberías",
      "Compresor desgastado",
      "Bloque de válvulas con pérdidas",
      "Sensor de altura o módulo defectuoso",
    ],
    brands: ["Wabco", "AMK", "Continental", "Mercedes", "Audi", "Land Rover"],
    models: ["Clase E", "A6 Allroad", "Q7", "Range Rover", "Cayenne", "Touareg"],
    process: [
      "Lectura de fallos y síntomas de altura",
      "Comprobación de fugas, compresor y bloque de válvulas",
      "Reparación de componentes recuperables",
      "Prueba y recomendaciones de calibración",
    ],
    warranty:
      "La garantía depende de reparar la causa completa. Un compresor reparado puede dañarse si persiste una fuga en el sistema.",
    faq: [
      {
        question: "¿Por qué baja el coche después de aparcar?",
        answer:
          "Normalmente indica fuga en balona, tubería o bloque de válvulas. Es importante diagnosticar antes de cambiar piezas.",
      },
      {
        question: "¿Reparáis compresores de suspensión neumática?",
        answer:
          "Sí, revisamos compresores y componentes asociados cuando la referencia permite reparación.",
      },
      {
        question: "¿Hace falta calibrar la suspensión?",
        answer:
          "En muchos modelos se recomienda calibrar alturas después de reparar o sustituir componentes.",
      },
    ],
    related: ["direccion-electrica", "reparacion-modulos-abs", "compresores-aire-acondicionado"],
  },
  {
    slug: "cambio-cvt-mercedes",
    title: "Cambio CVT Mercedes",
    metaTitle: "Reparación cambio CVT Mercedes | Diagnóstico y unidad hidráulica",
    metaDescription:
      "Servicio técnico para cambio CVT Mercedes: fallos de presión, tirones, modo emergencia y reparación de componentes electrónicos o hidráulicos.",
    description:
      "Diagnóstico y reparación de componentes de cambio CVT Mercedes con enfoque técnico y sin venta online.",
    h1: "Reparación de cambio CVT Mercedes",
    intro:
      "El cambio CVT Mercedes requiere diagnóstico de presión, electrónica y desgaste interno. Nuestro servicio se centra en identificar la avería real y reparar componentes recuperables.",
    image: "/images/conveyor-transfer-suite.jpg",
    imageAlt: "Componente de cambio CVT Mercedes en revisión técnica.",
    symptoms: [
      "Tirones al iniciar la marcha",
      "El cambio entra en modo emergencia",
      "Revoluciones suben sin avance proporcional",
      "Errores de presión o sensores de transmisión",
    ],
    commonFailures: [
      "Fallo de unidad hidráulica",
      "Sensores internos defectuosos",
      "Problemas de presión de aceite",
      "Desgaste interno del variador",
    ],
    brands: ["Mercedes-Benz", "Bosch", "Continental", "Temic", "Valeo", "Schaeffler"],
    models: ["Clase A", "Clase B", "Autotronic", "W169", "W245", "CVT Mercedes"],
    process: [
      "Recopilación de síntomas y códigos de avería",
      "Identificación de referencia y tipo de cambio",
      "Comprobación electrónica e hidráulica",
      "Reparación técnica y pautas de adaptación",
    ],
    warranty:
      "La garantía cubre los componentes reparados. El estado mecánico interno del cambio debe verificarse antes del montaje definitivo.",
    faq: [
      {
        question: "¿Reparáis el cambio completo o componentes?",
        answer:
          "Nos centramos en diagnóstico y reparación de componentes recuperables. Si el daño es mecánico severo, lo indicamos antes de intervenir.",
      },
      {
        question: "¿Es normal que el cambio CVT dé tirones?",
        answer:
          "No. Los tirones pueden venir de presión, sensores, adaptación o desgaste interno y deben diagnosticarse.",
      },
      {
        question: "¿Trabajáis con talleres de Girona o Tarragona?",
        answer:
          "Sí, podemos coordinar recepción de unidades desde Girona, Tarragona y otras zonas.",
      },
    ],
    related: ["reparacion-mecatronica-dsg", "centralitas-motor", "reparacion-modulos-abs"],
  },
];

export const productCategories = serviceCategories.map((category) => ({
  label: category.title,
  value: category.slug,
}));

export function getCategoryBySlug(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getCategoryTitle(slug: CategorySlug) {
  return getCategoryBySlug(slug)?.title ?? slug;
}
