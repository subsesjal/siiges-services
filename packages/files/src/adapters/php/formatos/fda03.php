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

set_error_handler(function ($severity, $message, $file, $line) {
  file_put_contents('php://stderr', "Error [$severity]: $message in $file on line $line\n");
  exit(1);
});

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
$programa = $solicitud['programa'] ?? [];
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];
$usuario = $solicitud['usuario'] ?? [];
$ratificacion = $institucion['ratificacionesNombre'] ?? [];

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->Ln(25);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFillColor(115, 199, 209);
$pdf->Cell(140, 5, "", 0, 0, "L");
$pdf->Cell(35, 6, "FDA03", 0, 0, "R", true);
$pdf->Ln(10);

$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 5, safe_iconv("SOLICITUD PARA LA AUTORIZACIÓN DE NOMBRE DE LA INSTITUCIÓN"), 0, 1, "L");
$pdf->SetTextColor(0, 0, 0);
$pdf->Ln(5);

$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? date("Y-m-d");
$fechaFormateada = date("d/m/Y", strtotime($fechaRaw));
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("DATOS DEL PROPIETARIO O REPRESENTANTE LEGAL"), 1, 0, "C", true);
$pdf->Ln();

$dataPersonaSolicitante = [
  ["NOMBRE (S)", $usuario['persona']['nombre'] ?? ""],
  ["APELLIDO PATERNO", $usuario['persona']['apellidoPaterno'] ?? ""],
  ["APELLIDO MATERNO", $usuario['persona']['apellidoMaterno'] ?? ""],
];

$pdf->SetWidths([70, 104]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);

$pdf->SetFont("Nutmeg", "", 9);
foreach ($dataPersonaSolicitante as $item) {
  $pdf->Row([
    safe_iconv($item[0]),
    safe_iconv(mb_strtoupper($item[1]))
  ]);
}
$pdf->Ln();

if (is_array($ratificacion) && isset($ratificacion[0])) {
  $registroRatificacion = $ratificacion[0];
  $esNombreAutorizado = $registroRatificacion["esNombreAutorizado"] ?? false;

  if ($esNombreAutorizado) {
    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 9);
    $pdf->Cell(174, 5, safe_iconv("EN CASO DE TENER NOMBRE AUTORIZADO"), 1, 0, "C", true);
    $pdf->Ln();

    $fechaRawAutorizacion = $registroRatificacion["fechaAutorizacion"] ?? null;
    $fechaAutorizacion = $fechaRawAutorizacion ? date("d/m/Y", strtotime($fechaRawAutorizacion)) : "";

    $nombresAutorizados = [
      ["NOMBRE AUTORIZADO", $registroRatificacion["nombreAutorizado"] ?? ""],
      ["RVOE", $programa["acuerdoRvoe"] ?? ""],
      ["FECHA DE AUTORIZACIÓN DE NOMBRE", $fechaAutorizacion ?? ""],
    ];

    $pdf->SetWidths([70, 104]);
    $pdf->SetLineHeight(5);
    $pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
    $pdf->SetFont("Nutmeg", "", 9);

    foreach ($nombresAutorizados as $item) {
      $pdf->RowBlanco([
        safe_iconv($item[0]),
        safe_iconv(mb_strtoupper($item[1]))
      ]);
    }
    $pdf->Ln();
  } else {
    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 9);
    $pdf->Cell(174, 5, safe_iconv("PROPUESTAS DE NOMBRE"), 1, 0, "C", true);
    $pdf->Ln();

    $propuestas = [
      ["NOMBRE PROPUESTO 1", $registroRatificacion["nombrePropuesto1"] ?? ""],
      ["NOMBRE PROPUESTO 2", $registroRatificacion["nombrePropuesto2"] ?? ""],
      ["NOMBRE PROPUESTO 3", $registroRatificacion["nombrePropuesto3"] ?? ""],
    ];

    $pdf->SetWidths([70, 104]);
    $pdf->SetLineHeight(5);
    $pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
    $pdf->SetFont("Nutmeg", "", 9);

    foreach ($propuestas as $item) {
      $pdf->RowBlanco([
        safe_iconv($item[0]),
        safe_iconv(mb_strtoupper($item[1]))
      ]);
    }
    $pdf->Ln();
  }
}

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv("BAJO PROTESTA DE DECIR VERDAD"), 0, 1, "C");
$pdf->SetFont("Nutmegb", "", 11);
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper(trim(
  ($usuario["persona"]['nombre'] ?? '') . ' ' .
  ($usuario["persona"]['apellidoPaterno'] ?? '') . ' ' .
  ($usuario["persona"]['apellidoMaterno'] ?? '')
) ?? "")), 0, 1, "C");

echo $pdf->Output('S');