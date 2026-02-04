<?php
require(realpath(__DIR__ . "/../formatos/pdf.php"));

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

set_exception_handler(function ($e) {
  file_put_contents('php://stderr', "Uncaught Exception: " . $e->getMessage() . "\n");
  file_put_contents('php://stderr', $e->getTraceAsString() . "\n");
  exit(1);
});

function safe_iconv($string)
{
  if (is_array($string)) $string = implode(", ", $string);
  return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', (string)$string);
}

class PDF_FOLIO_CER extends PDF
{
  function Header()
  {
    // Logo Innovación (izquierda)
    $this->Image(realpath(__DIR__ . "/../images/encabezado.png"), 10, 15, 70);
    // Escudo Jalisco (derecha)
    $this->Image(realpath(__DIR__ . "/../images/jalisco.png"), 230, 10, 25);

    // Texto institucional
    $this->AddFont('Nutmeg', '', 'Nutmeg-Regular.php');
    $this->AddFont('Nutmegb', '', 'Nutmeg-Bold.php');
    $this->SetFont("Nutmegb", "", 9);
    $this->SetY(15);
    $this->Cell(0, 5, safe_iconv("SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA"), 0, 1, "C");
    $this->Cell(0, 5, safe_iconv("SUBSECRETARÍA DE EDUCACIÓN SUPERIOR"), 0, 1, "C");
    $this->Cell(0, 5, safe_iconv("DIRECCIÓN GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES"), 0, 1, "C");
    $this->Cell(0, 5, safe_iconv("DIRECCIÓN DE SERVICIOS ESCOLARES"), 0, 1, "C");
    $this->Ln(10);
  }

  function Footer() {}

  function checkNewPageLandscape($h = 10)
  {
    if ($this->GetY() + $h > 165) {
      $this->AliasNbPages();
      $this->AddPage("L", "Letter");
      $this->Ln(10);
      return true;
    }
    return false;
  }
}

$data = json_decode(file_get_contents('php://stdin'), true);
if (!$data) {
  fwrite(STDERR, "No se recibieron datos válidos o el JSON está malformado.\n");
  exit(1);
}

$solicitud = $data ?? [];
$programa = $solicitud['programa'] ?? [];
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];
$nivel = $programa['nivel'] ?? [];
$solicitudFoliosAlumnos = $solicitud['solicitudFoliosAlumnos'] ?? [];

$pdf = new PDF_FOLIO_CER();
$pdf->AliasNbPages();
$pdf->AddPage("L", "Letter");
$pdf->SetMargins(15, 15, 15);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 8, safe_iconv("FOLIOS OTORGADOS PARA TÍTULOS"), 0, 1, "C");
$pdf->Ln(5);
$pdf->SetTextColor(0, 0, 0);

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetLineHeight(5);
$pdf->SetWidths([55, 55, 55, 55]);
$pdf->SetAligns(["C", "C", "C", "C"]);
$pdf->SetColors([[255, 213, 176], [255, 255, 255], [255, 213, 176], [255, 255, 255]]);

$fechaEnvio = isset($solicitud["fecha"]) ? date("d-m-Y", strtotime($solicitud["fecha"])) : date("d-m-Y");
$tipoCertificado = $solicitud["tipoDocumento"]["nombre"] ?? "NO REGISTRADA";
$planEstudios = $programa["nombre"] ?? "NO REGISTRADO";
$grado = $nivel["descripcion"] ?? "NO REGISTRADO";
$institucionNombre = $institucion["nombre"] ?? "NO REGISTRADA";

$primerAlumno = $solicitudFoliosAlumnos[0] ?? null;
$folioDocAlumno = $primerAlumno['folioDocumentoAlumno'] ?? [];
$libro = $folioDocAlumno['libro']['nombre']
  ?? ($folioDocAlumno[0]['libro']['nombre'] ?? 'N/A');

$claveCT = $plantel["claveCentroTrabajo"] ?? "N/A";
$folioPago = $solicitud["folioPago"] ?? "N/A";

$pdf->RowBlanco([
  safe_iconv("FECHA DE ENVÍO DE LA SOLICITUD"),
  safe_iconv($fechaEnvio),
  safe_iconv("INSTITUCIONES DE EDUCACIÓN SUPERIOR"),
  safe_iconv(mb_strtoupper($institucionNombre))
]);
$pdf->RowBlanco([
  safe_iconv("TIPO DE CERTIFICADO"),
  safe_iconv(mb_strtoupper($tipoCertificado)),
  safe_iconv("LIBRO"),
  safe_iconv($libro)
]);
$pdf->RowBlanco([
  safe_iconv("PLANES DE ESTUDIO"),
  safe_iconv(mb_strtoupper($planEstudios)),
  safe_iconv("CLAVE DE CENTRO DE TRABAJO"),
  safe_iconv($claveCT)
]);
$pdf->RowBlanco([
  safe_iconv("GRADO ACADÉMICO"),
  safe_iconv(mb_strtoupper($grado)),
  safe_iconv("NÚMERO DE RECIBO DE PAGO OFICIAL"),
  safe_iconv($folioPago)
]);
$pdf->Ln(10);

$pdf->SetFont("Nutmegb", "", 9);
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(250, 6, safe_iconv("LISTADO DE TITULADOS"), 1, 1, "C", true);
$pdf->Ln(0);

$pdf->SetFont("Nutmeg", "", 8);
$pdf->SetFillColor(255, 213, 176);
$widths = [35, 35, 50, 30, 30, 20, 25, 25];
$texts = [
  "APELLIDO\nPATERNO",
  "APELLIDO\nMATERNO",
  "NOMBRE(S)",
  "NÚMERO DE\nFOLIO DE\nACTA DE\nTITULACIÓN",
  "FECHA DE\nEXPEDICIÓN\nDEL\nTÍTULO",
  "FOJA",
  "FOLIO\nTÍTULO",
  "FECHA DE\nREGISTRO"
];
$pdf->ExpandHeaderRow($pdf, $texts, $widths);

$pdf->SetFont("Nutmeg", "", 8);
$pdf->SetFillColor(255, 255, 255);

$pdf->SetLineHeight(6);
$pdf->SetWidths([35, 35, 50, 30, 30, 20, 25, 25]);
$pdf->SetAligns(["C", "C", "C", "C", "C", "C", "C", "C"]);
$pdf->SetColors(array_fill(0, 8, [255, 255, 255]));

foreach ($solicitudFoliosAlumnos as $alumno) {
  $persona = $alumno['alumno']['persona'] ?? [];
  $apellidoPaterno = $persona['apellidoPaterno'] ?? '';
  $apellidoMaterno = $persona['apellidoMaterno'] ?? '';
  $nombre = $persona['nombre'] ?? '';

  $folioActa = $alumno['folioActa'] ?? '';
  $fechaExpedicion = $alumno['fechaExpedicion'] ?? '';
  $folioDocumentoAlumno = $alumno['folioDocumentoAlumno'] ?? [];
  $foja = $folioDocumentoAlumno['foja']['nombre'] ?? '';
  $folioTitulo = $folioDocumentoAlumno['folioDocumento'] ?? '';
  $fechaRegistro = $alumno['fechaRegistro'] ?? '';

  $pdf->RowBlancoLandscape([
    safe_iconv(mb_strtoupper($apellidoPaterno)),
    safe_iconv(mb_strtoupper($apellidoMaterno)),
    safe_iconv(mb_strtoupper($nombre)),
    safe_iconv($folioActa),
    safe_iconv($fechaExpedicion ? date("d-m-Y", strtotime($fechaExpedicion)) : ''),
    safe_iconv($foja),
    safe_iconv($folioTitulo),
    safe_iconv($fechaRegistro ? date("d-m-Y", strtotime($fechaRegistro)) : '')
  ]);
}

$pdf->Ln(10);

if ($pdf->checkNewPageLandscape()) {
  $pdf->Ln(0);
}

$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(130, 5, safe_iconv("NOMBRE Y FIRMA DEL DIRECTOR DE LA INSTITUCIÓN"), 0, 0, "L");
$pdf->Cell(100, 5, safe_iconv("NOMBRE Y FIRMA DE RECIBIDO CONTROL ESCOLAR"), 0, 1, "L");
$pdf->Ln(10);

$pdf->SetDrawColor(180, 180, 180);
$pdf->SetTextColor(180, 180, 180);
$pdf->SetFont("Nutmegb", "", 8);

$y = $pdf->GetY();
$selloSize = 40;

$pdf->Rect(15, $y - 5, $selloSize, $selloSize);
$pdf->SetXY(15, $y + 10);
$pdf->MultiCell($selloSize, 5, safe_iconv("SELLO\nINSTITUCIÓN DE\nEDUCACIÓN SUPERIOR"), 0, "C");

$pdf->Rect(145, $y - 5, $selloSize, $selloSize);
$pdf->SetXY(145, $y + 10);
$pdf->MultiCell($selloSize, 5, safe_iconv("SELLO\nCONTROL ESCOLAR"), 0, "C");

$pdf->Output('I', 'FOLIO_CER.pdf');
?>
