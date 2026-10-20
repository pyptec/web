import capture0 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-dashboard.png";
import capture1 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-historico-co2.png";
import capture2 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-historico-etileno.png";
import capture3 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-historico-temperatura.png";
import capture4 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-historico-humedad.png";
import capture5 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-historico-pt1000.png";
import capture6 from "../assets/proyectos/rpi-mdfr/rpi-mdfr-ciclos-co2.png";

export const RPI_MDFR_CAPTURES = [
  { src: capture0, category: "dashboard", width: 1523, height: 790, alt: "Dashboard original RPI-MDFR con mediciones, estados de puerta y persona atrapada y actuadores", caption: "Captura original del dashboard de supervisión. Muestra las lecturas y estados en el momento de la captura; no es un panel en vivo." },
  { src: capture1, category: "sensores", width: 1272, height: 846, alt: "Gráfica histórica original del sensor de CO₂ en la cámara de maduración", caption: "Registro histórico de CO₂ mostrado por el sistema." },
  { src: capture2, category: "sensores", width: 1341, height: 834, alt: "Gráfica histórica original de etileno C₂H₄ en la cámara de maduración", caption: "Registro histórico de etileno C₂H₄ mostrado por el sistema." },
  { src: capture3, category: "sensores", width: 1372, height: 852, alt: "Gráfica histórica original de temperatura ambiente en la cámara de maduración", caption: "Registro histórico de temperatura ambiente mostrado por el sistema." },
  { src: capture4, category: "sensores", width: 1305, height: 850, alt: "Gráfica histórica original de humedad relativa en la cámara de maduración", caption: "Registro histórico de humedad relativa mostrado por el sistema." },
  { src: capture5, category: "sensores", width: 1248, height: 845, alt: "Gráfica histórica original de la sonda PT1000 del sistema RPI-MDFR", caption: "Registro histórico de la sonda PT1000. No se presenta como una gráfica de PT100." },
  { src: capture6, category: "historicos", width: 1252, height: 713, alt: "Análisis original de ciclos de CO₂ por lote en RPI-MDFR", caption: "Interfaz original de análisis de ciclos de CO₂. El lote está rotulado SIM-36H-CICLOS: es un ejemplo de análisis, no un resultado de producción acreditado." },
];
