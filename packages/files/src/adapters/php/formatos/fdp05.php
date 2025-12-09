<?php
require(realpath(__DIR__ . "/../formatos/pdf.php"));

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

class FDP05PDF extends PDF
{
  function Header()
  {
    $this->Image(realpath(__DIR__ . "/../images/encabezado.png"), 60, 15, 75);
    $this->AddFont('Nutmeg', '', 'Nutmeg-Regular.php');
    $this->AddFont('Nutmegb', '', 'Nutmeg-Bold.php');
    $this->AddFont('Nutmegbk', '', 'Nutmeg-Book.php');

    $this->SetFont("Nutmegb", "", 11);
    $this->SetTextColor(255, 255, 255);
    $this->SetFillColor(115, 199, 209);
    $this->Cell(140, 5, "", 0, 0, "L");
    $this->Ln(20);

    if ($this->PageNo() === 1) {
      $this->Ln(5);
      $this->SetFont("Nutmegb", "", 11);
      $this->Cell(140, 5, "", 0, 0, "L");
      $this->SetX(-55);
      $this->Cell(35, 6, "FDP05", 0, 0, "R", true);
      $this->Ln(10);
      $this->SetTextColor(115, 199, 209);
      $this->SetX(20);
      $this->Cell(0, 5, safe_iconv("TRAYECTORIA EDUCATIVA Y TUTORÍA DE LOS ESTUDIANTES"), 0, 1, "L");
      $this->SetTextColor(0, 0, 0);
      $this->Ln(5);
    }
  }
}

set_exception_handler(function ($e) {
  file_put_contents('php://stderr', "Uncaught Exception: " . $e->getMessage() . "\n");
  file_put_contents('php://stderr', $e->getTraceAsString() . "\n");
  exit(1);
});

set_error_handler(function ($severity, $message, $file, $line) {
  file_put_contents('php://stderr', "Error [$severity]: $message in $file on line $line\n");
  exit(1);
});

function safe_iconv($string)
{
  if (is_array($string)) {
    $string = implode(", ", $string);
  } elseif (is_object($string)) {
    $string = json_encode($string);
  }
  return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', (string) $string);
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
$usuario = $solicitud['usuario'] ?? [];
$persona = $usuario['persona'] ?? [];
$ratificacion = $institucion['ratificacionesNombre'] ?? [];
$trayectoria = $programa['trayectoria'] ?? [];

$pdf = new FDP05PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);
$pdf->SetAutoPageBreak(true, 30);

$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? null;
$fechaFormateada = $fechaRaw ? date("d/m/Y", strtotime($fechaRaw)) : "";
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("1. PROGRAMA DE SEGUIMIENTO DE LA TRAYECTORIA ACADÉMICA DE LOS ESTUDIANTES"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($trayectoria["programaSeguimiento"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("2. FUNCIÓN TUTORIAL"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($trayectoria["funcionTutorial"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("3. TIPO DE TUTORÍA"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($trayectoria["tipoTutoria"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("4. TASA DE EGRESOS"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($trayectoria["tasaEgreso"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->Ln(25);

if ($pdf->checkNewPage()) {
  $pdf->Ln(20);
}

$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv("BAJO PROTESTA DE DECIR VERDAD"), 0, 1, "C");

$pdf->SetFont("Nutmegb", "", 11);
$nombreCompleto = trim(
  ($persona['nombre'] ?? '') . ' ' .
  ($persona['apellidoPaterno'] ?? '') . ' ' .
  ($persona['apellidoMaterno'] ?? '')
);
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($nombreCompleto)), 0, 1, "C");

echo $pdf->Output('S');
