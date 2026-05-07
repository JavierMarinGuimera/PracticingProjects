import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "diagnostico-reparacion-turbo",
    title: "Diagnóstico y reparación de turbo",
    category: "reparacion-turbos",
    categoryLabel: "Reparación de Turbos",
    description:
      "Revisión de geometría variable, actuador, eje, fugas de aceite y presión de soplado antes de reparar.",
    image: "/images/flowline-automation-cell.jpg",
    imageAlt: "Turbo de automóvil preparado para diagnóstico y reparación.",
    featured: true,
  },
  {
    id: "actuador-electronico-turbo",
    title: "Actuador electrónico de turbo",
    category: "reparacion-turbos",
    categoryLabel: "Reparación de Turbos",
    description:
      "Comprobación y reparación de actuadores con fallos de posición, comunicación o respuesta intermitente.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Actuador electrónico de turbo en banco de comprobación.",
  },
  {
    id: "modulo-abs-esp",
    title: "Módulo ABS / ESP",
    category: "reparacion-modulos-abs",
    categoryLabel: "Reparación de Módulos ABS",
    description:
      "Reparación electrónica de módulos ABS con errores de comunicación, bomba o testigos permanentes.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Módulo ABS de vehículo con electrónica expuesta para revisión.",
    featured: true,
  },
  {
    id: "bomba-hidraulica-abs",
    title: "Bomba hidráulica ABS",
    category: "reparacion-modulos-abs",
    categoryLabel: "Reparación de Módulos ABS",
    description:
      "Servicio para fallos de motor de bomba, bloque hidráulico y alimentación en unidades ABS recuperables.",
    image: "/images/inox-process-manifold.jpg",
    imageAlt: "Bomba hidráulica ABS preparada para reparación.",
  },
  {
    id: "mecatronica-dsg-dq200",
    title: "Mecatrónica DSG DQ200",
    category: "reparacion-mecatronica-dsg",
    categoryLabel: "Reparación Mecatrónica DSG",
    description:
      "Reparación de fallos de presión, solenoides, sensores y errores PRNDS en DSG de 7 velocidades.",
    image: "/images/conveyor-transfer-suite.jpg",
    imageAlt: "Unidad mecatrónica DSG DQ200 para diagnóstico técnico.",
    featured: true,
  },
  {
    id: "mecatronica-dsg-dq250",
    title: "Mecatrónica DSG DQ250",
    category: "reparacion-mecatronica-dsg",
    categoryLabel: "Reparación Mecatrónica DSG",
    description:
      "Diagnóstico de unidad hidráulica y electrónica para DSG de 6 velocidades con tirones o modo emergencia.",
    image: "/images/conveyor-transfer-suite.jpg",
    imageAlt: "Mecatrónica DSG DQ250 revisada en banco.",
  },
  {
    id: "columna-direccion-electrica",
    title: "Columna de dirección eléctrica",
    category: "direccion-electrica",
    categoryLabel: "Dirección Eléctrica",
    description:
      "Reparación de columnas EPS con fallo de asistencia, sensor de par o módulo electrónico sin comunicación.",
    image: "/images/modular-storage-system.jpg",
    imageAlt: "Columna de dirección eléctrica lista para reparación.",
    featured: true,
  },
  {
    id: "modulo-eps",
    title: "Módulo EPS",
    category: "direccion-electrica",
    categoryLabel: "Dirección Eléctrica",
    description:
      "Comprobación de módulo de asistencia eléctrica, alimentación, conectores y averías intermitentes.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Módulo EPS de dirección asistida eléctrica.",
  },
  {
    id: "centralita-motor-ecu",
    title: "Centralita de motor ECU",
    category: "centralitas-motor",
    categoryLabel: "Centralitas de Motor",
    description:
      "Reparación de ECU con fallos de arranque, comunicación CAN, alimentación interna o etapas de potencia.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Centralita de motor ECU en proceso de diagnóstico electrónico.",
    featured: true,
  },
  {
    id: "ecu-danada-por-agua",
    title: "ECU dañada por humedad",
    category: "centralitas-motor",
    categoryLabel: "Centralitas de Motor",
    description:
      "Inspección y reparación de centralitas con sulfatación, cortocircuitos o daños por entrada de agua.",
    image: "/images/modular-storage-system.jpg",
    imageAlt: "Centralita ECU afectada por humedad lista para revisión.",
  },
  {
    id: "compresor-aire-acondicionado",
    title: "Compresor de aire acondicionado",
    category: "compresores-aire-acondicionado",
    categoryLabel: "Compresores A/C",
    description:
      "Reparación de compresores con ruido, falta de presión, válvula reguladora o embrague defectuoso.",
    image: "/images/inox-process-manifold.jpg",
    imageAlt: "Compresor de aire acondicionado automotriz.",
  },
  {
    id: "embrague-polea-compresor",
    title: "Embrague y polea de compresor",
    category: "compresores-aire-acondicionado",
    categoryLabel: "Compresores A/C",
    description:
      "Servicio para fallos de accionamiento, polea, bobina y acoplamiento del compresor de A/C.",
    image: "/images/flowline-automation-cell.jpg",
    imageAlt: "Polea de compresor de aire acondicionado revisada en taller.",
  },
  {
    id: "compresor-suspension-neumatica",
    title: "Compresor de suspensión neumática",
    category: "suspension-neumatica",
    categoryLabel: "Suspensión Neumática",
    description:
      "Reparación de compresores fatigados por fugas, uso excesivo o fallos de presión del sistema.",
    image: "/images/modular-storage-system.jpg",
    imageAlt: "Compresor de suspensión neumática preparado para comprobación.",
  },
  {
    id: "bloque-valvulas-suspension",
    title: "Bloque de válvulas neumático",
    category: "suspension-neumatica",
    categoryLabel: "Suspensión Neumática",
    description:
      "Diagnóstico de pérdidas internas, distribución de aire y fallos de altura en suspensión neumática.",
    image: "/images/inox-process-manifold.jpg",
    imageAlt: "Bloque de válvulas de suspensión neumática.",
  },
  {
    id: "cvt-mercedes-autotronic",
    title: "Cambio CVT Mercedes Autotronic",
    category: "cambio-cvt-mercedes",
    categoryLabel: "Cambio CVT Mercedes",
    description:
      "Diagnóstico de tirones, errores de presión y modo emergencia en cambios CVT Mercedes.",
    image: "/images/conveyor-transfer-suite.jpg",
    imageAlt: "Componente de cambio CVT Mercedes en reparación.",
  },
  {
    id: "unidad-hidraulica-cvt",
    title: "Unidad hidráulica CVT",
    category: "cambio-cvt-mercedes",
    categoryLabel: "Cambio CVT Mercedes",
    description:
      "Comprobación de presión, sensores y componentes hidráulicos en transmisiones CVT recuperables.",
    image: "/images/precision-control-panel.jpg",
    imageAlt: "Unidad hidráulica de cambio CVT bajo diagnóstico.",
  },
];
