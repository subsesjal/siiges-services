<?php
require(realpath(__DIR__ . "/../formatos/pdf.php"));

function safe_iconv($string)
{
  if (is_array($string)) {
    $string = implode(", ", $string);
  }
  return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', (string) $string);
}

$data = json_decode(file_get_contents('php://stdin'), true);

if (!$data) {
  fwrite(STDERR, "No se recibieron datos válidos o el JSON está malformado.\n");
  exit(1);
}

$solicitud = $data ?? [];
$folio = $solicitud['folio'];
$usuario = $solicitud['usuario'] ?? [];
$programa = $solicitud['programa'] ?? [];
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];
$nivel = $programa['nivel'] ?? [];
$modalidad = $programa['modalidad'] ?? [];
$ciclo = $programa['ciclo'] ?? [];
$domicilioPlantel = $plantel['domicilio'] ?? [];

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->Ln(25);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFillColor(115, 199, 209);
$pdf->Cell(140, 5, "", 0, 0, "L");
$pdf->Cell(35, 6, "OFAD", 0, 0, "R", true);
$pdf->Ln(10);

$tituloInicial = $tipoSolicitudId === 1
  ? "OFICIO ADMISORIO DE RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS"
  : "OFICIO ADMISORIO DE REFRENDO DEL RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS";

$pdf->SetFillColor(255, 255, 255);
$pdf->SetTextColor(115, 199, 209);
$pdf->SetFont("Nutmegb", "", 11);
$pdf->MultiCell(0, 5, safe_iconv($tituloInicial), 0, 1, "L");
$pdf->SetTextColor(0, 0, 0);
$pdf->Ln(5);

$pdf->SetFont("Nutmeg", "", 9);
$pdf->Ln(5);

$usuarioNombre = trim(
  ($usuario["persona"]['nombre'] ?? '') . ' ' .
  ($usuario["persona"]['apellidoPaterno'] ?? '') . ' ' .
  ($usuario["persona"]['apellidoMaterno'] ?? '')
);

$institucionNombre = $institucion["nombre"];
$programaNombre = $programa["nombre"];

$cicloTxt = [
  "Semestral",
  "Cuatrimestral",
  "Anual",
];

$modalidadTxt = [
  "Escolarizada",
  "No Escolarizada",
  "Mixta",
  "Dual",
];

$ciclos = [
  "Semestrales",
  "Cuatrimestrales",
  "Anuales",
];

$tipo = $programa["cicloId"];
$modalidad = $programa["modalidadId"];
$ciclo = $programa["cicloId"];

$pdf->MultiCell(0, 5, safe_iconv(
  "C. " . (mb_strtoupper($usuarioNombre))
), 0, "J");

$pdf->MultiCell(0, 5, safe_iconv(
  "REPRESENTANTE LEGAL DE " . (mb_strtoupper($institucion["nombre"]))
), 0, "J");

$pdf->MultiCell(0, 5, safe_iconv(
  "PRESENTE"
), 0, "J");

$pdf->Ln();

$fecha = date("d/m/Y", strtotime($solicitud["fecha"] ?? date("Y-m-d")));
$tipoSolicitudId = $solicitud["tipoSolicitudId"] ?? 1;

// Texto condicional
$textoInicialRVOE = $tipoSolicitudId === 1
  ? "Que en relación a su solicitud para obtener el Reconocimiento de Validez Oficial de Estudios (RVOE) presentada en esta Dirección General de Incorporación y Servicios Escolares, con fecha " . strtolower($fecha) . ", a través de la cual pretende ofertar e impartir"
  : "Que en relación a su solicitud para refrendo (actualización) del Reconocimiento de Validez Oficial de Estudios (RVOE) presentada en esta Dirección General de Incorporación y Servicios Escolares, con fecha " . strtolower($fecha) . ", a través de la cual pretende continuar impartiendo";

// Texto completo
$pdf->MultiCell(0, 5, safe_iconv(
  $textoInicialRVOE
  . " el plan y programas de estudio de la "
  . ($nivel["descripcion"] ?? "") . " en " . ($programa["nombre"] ?? "") . " con número de Folio " . $folio
  . " en el inmueble ubicado en " . ($domicilioPlantel["calle"]) . " número " . ($domicilioPlantel["numeroExterior"]) . " colonia "
  . ($domicilioPlantel["colonia"]) . ", " . "código postal " . ($domicilioPlantel["codigoPostal"]) . ", " . "municipio "
  . ($domicilioPlantel["municipio"]["nombre"]) . ", " . ($domicilioPlantel["estado"]["nombre"]) . ", "
  . "me permito informarle que esta Dirección tiene a bien emitir el presente oficio admisorio en virtud de haber presentado toda la documentación administrativa y académica requerida para continuar con cada una de las etapas establecidas en el Instructivo para la obtención del Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco 2025."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
  "En uso de las facultades que me confiere el artículo 3° fracción VI de la Constitución Política de los Estados Unidos Mexicanos; capítulo II del Reconocimiento de Validez Oficial de Estudios de la Ley de Educación Superior del Estado de Jalisco."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
  "Sin otro particular, hago propicia la ocasión para enviarle un cordial saludo."
), 0, "J");

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv(
  "ATENTAMENTE"
), 0, 1, "C");

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv("ING. MARCO ARTURO CASTRO AGUILERA"), 0, 1, "C");
$pdf->SetFont("Nutmegb", "", 11);
$pdf->Cell(0, 5, safe_iconv("DIRECTOR GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES"), 0, 1, "C");

$pdf->Output("I", "FDA02.pdf");
