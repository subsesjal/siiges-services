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
$nivel = $programa['nivel'] ?? [];
$modalidad = $programa['modalidad'] ?? [];
$ciclo = $programa['ciclo'] ?? [];
$domicilioPlantel = $plantel['domicilio'] ?? [];

$usuario = $solicitud['usuario'] ?? [];

$nombresDiligencias = $solicitud['diligencias'] ?? [];
$ratificacion = $institucion['ratificacionesNombre'] ?? [];

$cicloTxt = [
  "SEMESTRALES",
  "CUATRIMESTRALES",
  "ANUALES",
  "SEMESTRALES",
  "CUATRIMESTRALES"
];

$tituloTipoSolicitud = [
  "SOLICITUD DE RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS",
  "SOLICITUD DE REFRENDO A PLAN Y PROGRAMA DE ESTUDIO",
  "SOLICITUD DE CAMBIO DE DOMICILIO",
  "SOLICITUD DE CAMBIO DE REPRESENTANTE LEGAL"
];

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->Ln(25);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFillColor(115, 199, 209);
$pdf->Cell(140, 5, "", 0, 0, "L");
$pdf->Cell(35, 6, "FDA02", 0, 0, "R", true);
$pdf->Ln(10);

$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 5, safe_iconv($tituloTipoSolicitud[($solicitud["tipoSolicitudId"] ?? 1) - 1]), 0, 1, "L");
$pdf->SetTextColor(0, 0, 0);
$pdf->Ln(5);

$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? date("Y-m-d");
$fechaFormateada = date("d/m/Y", strtotime($fechaRaw));
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

$dataPrograma = [
  [
    "name" => "NOMBRE DE LA INSTITUCIÓN",
    "description" => $institucion["nombre"] ?? ""
  ],
  [
    "name" => "NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS",
    "description" => ($nivel["descripcion"] ?? "") . " en " . ($programa["nombre"] ?? "")
  ],
  [
    "name" => "DURACIÓN DEL PROGRAMA",
    "description" => ($programa["duracionPeriodos"] ?? '') . ' - PERIODOS ' . ($cicloTxt[($ciclo["id"] ?? 1) - 1])
  ],
  [
    "name" => "NOMBRE COMPLETO DE LA RAZÓN SOCIAL",
    "description" => $institucion["razonSocial"] ?? ""
  ],
];

$pdf->SetWidths([80, 95]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 161, 61], [255, 255, 255]]);

foreach ($dataPrograma as $item) {
  $pdf->Row([
    safe_iconv(mb_strtoupper($item['name'])),
    safe_iconv(mb_strtoupper($item['description']))
  ]);
}
$pdf->Ln(5);

$pdf->SetFont("Nutmegb", "", 9);
$pdf->SetFillColor(255, 161, 61);

$pdf->Cell(64, 5, "NIVEL DE ESTUDIO", 1, 0, "C", true);
$pdf->Cell(30, 5, "TURNO", 1, 0, "C", true);
$pdf->Cell(40, 5, "MODALIDAD", 1, 0, "C", true);
$pdf->Cell(40, 5, "CICLO", 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetColors([[255, 255, 255], [255, 255, 255]]);

$turnos = $programa["programaTurnos"] ?? ($programa["turnos"] ?? []);
$turnosTxt = [];

if (is_array($turnos)) {
  foreach ($turnos as $t) {
    if (isset($t['turno']['nombre'])) {
      $turnosTxt[] = $t['turno']['nombre'];
    } elseif (is_string($t)) {
      $turnosTxt[] = $t;
    }
  }
}

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetWidths([64, 30, 40, 40]);
$pdf->SetAligns(["C", "C", "C", "C"]);
$pdf->RowBlanco([
  safe_iconv(mb_strtoupper($nivel["descripcion"] ?? "")),
  safe_iconv(mb_strtoupper(implode(" / ", $turnosTxt))),
  safe_iconv(mb_strtoupper($modalidad["nombre"] ?? "")),
  safe_iconv(mb_strtoupper($ciclo["nombre"] ?? ""))
]);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("DOMICILIO DE LA INSTITUCIÓN"), 1, 1, "C", true);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(116, 5, safe_iconv("CALLE Y NÚMERO"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("COLONIA"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
$pdf->SetWidths([116, 58]);
$pdf->SetAligns(["C", "C"]);
$pdf->RowBlanco([
  safe_iconv(mb_strtoupper(($domicilioPlantel["calle"] ?? "") . " " . ($domicilioPlantel["numeroExterior"] ?? ""))),
  safe_iconv(mb_strtoupper($domicilioPlantel["colonia"] ?? ""))
]);

$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("CÓDIGO POSTAL"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("DELEGACIÓN O MUNICIPIO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "ENTIDAD FEDERATIVA", 1, 0, "C", true);
$pdf->Ln();

$municipio = $domicilioPlantel["municipio"];
$estado = $domicilioPlantel["estado"];

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
$pdf->SetWidths([58, 58, 58]);
$pdf->SetAligns(["C", "C", "C"]);
$pdf->RowBlanco([
  safe_iconv($domicilioPlantel["codigoPostal"] ?? ""),
  safe_iconv($municipio["nombre"] ?? ""),
  safe_iconv($estado["nombre"] ?? "")
]);

$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("NÚMERO TELEFÓNICO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "REDES SOCIALES", 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->SetWidths([58, 58, 58]);
$pdf->SetAligns(["C", "C", "C"]);
$pdf->RowBlanco([
  safe_iconv(($plantel["telefono1"] ?? "") . " " . ($plantel["telefono2"] ?? "")),
  safe_iconv($plantel["redesSociales"] ?? ""),
  safe_iconv($plantel["correo1"] ?? "")
]);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("DATOS DEL SOLICITANTE (PERSONA FÍSICA O REPRESENTANTE LEGAL DE LA PERSONA JURÍDICA)"), 1, 0, "C", true);
$pdf->Ln();

$dataPersonaSolicitante = [
  ["NOMBRE (S)", $usuario['persona']['nombre'] ?? ""],
  ["APELLIDO PATERNO", $usuario['persona']['apellidoPaterno'] ?? ""],
  ["APELLIDO MATERNO", $usuario['persona']['apellidoMaterno'] ?? ""],
  ["NACIONALIDAD", $usuario['persona']['nacionalidad'] ?? ""],
];

$pdf->SetWidths([70, 104]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
$pdf->SetAligns(["C", "L"]);
$pdf->SetFont("Nutmeg", "", 9);

foreach ($dataPersonaSolicitante as $item) {
  $pdf->RowBlanco([
    safe_iconv($item[0]),
    safe_iconv(mb_strtoupper($item[1]))
  ]);
}

$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(116, 5, safe_iconv("CALLE Y NÚMERO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "COLONIA", 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
$pdf->SetWidths([116, 58]);
$pdf->SetAligns(["C", "C"]);
$pdf->RowBlanco([
  safe_iconv(($domicilioPlantel["calle"] ?? "") . " " . ($domicilioPlantel["numeroExterior"] ?? "")),
  safe_iconv($domicilioPlantel["colonia"] ?? "")
]);
$pdf->Ln();

$rector = $institucion["rector"] ?? [];

if ($rector) {
  $pdf->SetFillColor(255, 161, 61);
  $pdf->SetFont("Nutmegb", "", 9);
  $pdf->Cell(174, 5, safe_iconv("DATOS DEL RECTOR"), 1, 1, "C", true);
  $pdf->SetFillColor(255, 213, 176);
  $pdf->SetFont("Nutmeg", "", 9);

  $pdf->Cell(58, 5, safe_iconv("NOMBRE (S)"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("APELLIDO PATERNO"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("APELLIDO MATERNO"), 1, 0, "C", true);
  $pdf->Ln();

  $rectorPersona = $rector["persona"] ?? [];

  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->SetFillColor(255, 255, 255);
  $pdf->SetWidths([58, 58, 58]);
  $pdf->SetAligns(["C", "C", "C"]);
  $pdf->RowBlanco([
    safe_iconv(mb_strtoupper($rectorPersona["nombre"] ?? "")),
    safe_iconv(mb_strtoupper($rectorPersona["apellidoPaterno"] ?? "")),
    safe_iconv(mb_strtoupper($rectorPersona["apellidoMaterno"] ?? ""))
  ]);

  $pdf->SetFillColor(255, 213, 176);
  $pdf->SetFont("Nutmeg", "", 7);
  $pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO INSTITUCIONAL"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO PERSONAL"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("NÚMERO DE TELÉFONO CELULAR"), 1, 0, "C", true);
  $pdf->Ln();

  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->SetFillColor(255, 255, 255);
  $pdf->SetWidths([58, 58, 58]);
  $pdf->SetAligns(["C", "C", "C"]);
  $pdf->RowBlanco([
    safe_iconv($rectorPersona["correoPrimario"] ?? ""),
    safe_iconv($rectorPersona["correoSecundario"] ?? ""),
    safe_iconv($rectorPersona["celular"] ?? "")
  ]);

  $formaciones = $rector["formacionesRectores"] ?? [];
  $formacionRector = null;

  if (is_array($formaciones)) {
    foreach ($formaciones as $fx) {
      if (!empty($fx['formacion']) && is_array($fx['formacion'])) {
        $formacionRector = $fx['formacion'];
        break;
      }
    }
  }

  if (!empty($formacionRector)) {
    $niveles = [
      1 => 'Maestría',
      2 => 'Licenciatura',
      3 => 'Técnico Superior Universitario',
      4 => 'Bachillerato',
      5 => 'Especialidad',
      6 => 'Doctorado',
      7 => 'Profesional Asociado',
      8 => 'Educación Continua',
    ];

    $nivelId = isset($formacionRector["nivelId"]) ? (int) $formacionRector["nivelId"] : 0;
    $nivelDescripcion = $niveles[$nivelId] ?? 'SIN ESPECIFICAR';

    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 9);
    $pdf->Cell(174, 5, safe_iconv("FORMACIÓN ACADÉMICA"), 1, 1, "C", true);

    $pdf->SetFillColor(255, 213, 176);
    $pdf->SetFont("Nutmeg", "", 9);
    $pdf->Cell(87, 5, safe_iconv("GRADO EDUCATIVO"), 1, 0, "C", true);
    $pdf->Cell(87, 5, safe_iconv("NOMBRE DE LOS ESTUDIOS"), 1, 0, "C", true);
    $pdf->Ln();

    $pdf->SetFillColor(255, 255, 255);
    $pdf->SetWidths([87, 87]);
    $pdf->SetAligns(["C", "C"]);
    $pdf->RowBlanco([
      safe_iconv(mb_strtoupper($nivelDescripcion)),
      safe_iconv(mb_strtoupper($formacionRector["nombre"] ?? ""))
    ]);

    $pdf->SetFillColor(255, 213, 176);
    $pdf->Cell(174, 5, safe_iconv("NOMBRE DE LA INSTITUCIÓN EDUCATIVA DE PROCEDENCIA"), 1, 0, "C", true);
    $pdf->Ln();

    $pdf->SetFont("Nutmeg", "", 9);
    $pdf->SetFillColor(255, 255, 255);
    $pdf->SetWidths([174]);
    $pdf->SetAligns(["C"]);
    $pdf->RowBlanco([
      safe_iconv($formacionRector["institucion"] ?? "")
    ]);
    $pdf->Ln();
  } else {
    $pdf->Ln();
  }
}

$directores = $plantel["directores"] ?? [];

if (!empty($directores)) {
  $pdf->SetFillColor(255, 161, 61);
  $pdf->SetFont("Nutmegb", "", 9);
  $pdf->Cell(174, 5, safe_iconv("DATOS DEL DIRECTOR"), 1, 1, "C", true);
  $pdf->SetFillColor(255, 213, 176);
  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->Cell(58, 5, safe_iconv("NOMBRE (S)"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("APELLIDO PATERNO"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("APELLIDO MATERNO"), 1, 0, "C", true);
  $pdf->Ln();

  $directorObj = $directores[0] ?? [];
  $directorPersona = $directorObj["persona"] ?? [];

  $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
  $pdf->SetWidths([58, 58, 58]);
  $pdf->SetAligns(["C", "C", "C"]);
  $pdf->RowBlanco([
    safe_iconv(mb_strtoupper($directorPersona["nombre"] ?? "")),
    safe_iconv(mb_strtoupper($directorPersona["apellidoPaterno"] ?? "")),
    safe_iconv(mb_strtoupper($directorPersona["apellidoMaterno"] ?? ""))
  ]);

  $pdf->SetFillColor(255, 213, 176);
  $pdf->SetFont("Nutmeg", "", 7);
  $pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO INSTITUCIONAL"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO PERSONAL"), 1, 0, "C", true);
  $pdf->Cell(58, 5, safe_iconv("NÚMERO DE TELÉFONO CELULAR"), 1, 0, "C", true);
  $pdf->Ln();

  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
  $pdf->SetWidths([58, 58, 58]);
  $pdf->SetAligns(["C", "C", "C"]);
  $pdf->RowBlanco([
    safe_iconv($directorPersona["correoPrimario"] ?? ""),
    safe_iconv($directorPersona["correoSecundario"] ?? ""),
    safe_iconv($directorPersona["celular"] ?? "")
  ]);

  $formacionesDirector = $directorObj["formacionesDirectores"] ?? [];
  $formDirec = $formacionesDirector[0]["formacion"] ?? null;

  if (!empty($formDirec)) {
    $niveles = [
      1 => 'Maestría',
      2 => 'Licenciatura',
      3 => 'Técnico Superior Universitario',
      4 => 'Bachillerato',
      5 => 'Especialidad',
      6 => 'Doctorado',
      7 => 'Profesional Asociado',
      8 => 'Educación Continua',
    ];

    $nivelId = isset($formDirec["nivelId"]) ? (int) $formDirec["nivelId"] : 0;
    $nivelDescripcion = $niveles[$nivelId] ?? 'SIN ESPECIFICAR';

    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 9);
    $pdf->Cell(174, 5, safe_iconv("FORMACIÓN ACADÉMICA"), 1, 1, "C", true);

    $pdf->SetFillColor(255, 213, 176);
    $pdf->SetFont("Nutmeg", "", 9);
    $pdf->Cell(87, 5, safe_iconv("GRADO EDUCATIVO"), 1, 0, "C", true);
    $pdf->Cell(87, 5, safe_iconv("NOMBRE DE LOS ESTUDIOS"), 1, 0, "C", true);
    $pdf->Ln();

    $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
    $pdf->SetWidths([87, 87]);
    $pdf->SetAligns(["C", "C"]);
    $pdf->RowBlanco([
      safe_iconv(mb_strtoupper($nivelDescripcion)),
      safe_iconv(mb_strtoupper($formDirec["nombre"] ?? ""))
    ]);

    $pdf->SetFillColor(255, 213, 176);
    $pdf->Cell(174, 5, safe_iconv("NOMBRE DE LA INSTITUCIÓN EDUCATIVA DE PROCEDENCIA"), 1, 0, "C", true);
    $pdf->Ln();

    $pdf->SetFont("Nutmeg", "", 9);
    $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
    $pdf->SetWidths([174]);
    $pdf->SetAligns(["C"]);
    $pdf->RowBlanco([
      safe_iconv(mb_strtoupper($formDirec["institucion"]) ?? "")
    ]);
    $pdf->Ln();
  } else {
    $pdf->Ln();
  }
}

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 7);
$pdf->Cell(174, 5, safe_iconv("PERSONAL DESIGNADO PARA REALIZAR DILIGENCIAS PARA EL DESARROLLO Y SEGUIMIENTO DE LA SOLICITUD DE RVOE"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetWidths([70, 104]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
$pdf->SetAligns(["C", "L"]);

if (!empty($nombresDiligencias)) {
  foreach ($nombresDiligencias as $diligencia) {
    $diligentePersona = $diligencia['persona'] ?? [];
    $horaInicio = isset($diligencia['horaInicio']) ? new DateTime($diligencia['horaInicio'], new DateTimeZone('UTC')) : null;
    $horaFin = isset($diligencia['horaFin']) ? new DateTime($diligencia['horaFin'], new DateTimeZone('UTC')) : null;

    if ($horaInicio)
      $horaInicio->setTimezone(new DateTimeZone('America/Mexico_City'));
    if ($horaFin)
      $horaFin->setTimezone(new DateTimeZone('America/Mexico_City'));

    $horarioAtencion = '';
    if ($horaInicio && $horaFin) {
      $horarioAtencion = $horaInicio->format('H:i') . ' - ' . $horaFin->format('H:i');
    }

    $personalDesignado = [
      [
        "NOMBRE COMPLETO",
        trim(
          ($diligentePersona['nombre'] ?? '') . ' ' .
          ($diligentePersona['apellidoPaterno'] ?? '') . ' ' .
          ($diligentePersona['apellidoMaterno'] ?? '')
        )
      ],
      ["CARGO", $diligentePersona['tituloCargo'] ?? ""],
      ["NÚMERO TELEFÓNICO", $diligentePersona['telefono'] ?? ""],
      ["CORREO ELECTRÓNICO", $diligentePersona['correoPrimario'] ?? ""],
      ["HORARIO DE ATENCIÓN", $horarioAtencion],
    ];

    foreach ($personalDesignado as $item) {
      $pdf->RowBlanco([
        safe_iconv($item[0]),
        safe_iconv(mb_strtoupper($item[1]))
      ]);
    }

    $pdf->Ln(5);
  }
} else {
  $pdf->Cell(174, 5, safe_iconv("SIN PERSONAL REGISTRADO"), 1, 1, "C");
}

$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("NOMBRES PROPUESTOS PARA LA INSTITUCIÓN EDUCATIVA"), 1, 0, "C", true);
$pdf->Ln();

$nombresPropuestos = [
  ["NOMBRE PROPUESTO 1", $ratificacion[0]['nombrePropuesto1'] ?? ""],
  ["NOMBRE PROPUESTO 2", $ratificacion[0]['nombrePropuesto2'] ?? ""],
  ["NOMBRE PROPUESTO 3", $ratificacion[0]['nombrePropuesto3'] ?? ""],
];

$pdf->SetWidths([70, 104]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
$pdf->SetAligns(["C", "L"]);
$pdf->SetFont("Nutmeg", "", 9);

foreach ($nombresPropuestos as $item) {
  $pdf->RowBlanco([
    safe_iconv($item[0]),
    safe_iconv(mb_strtoupper($item[1]))
  ]);
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
?>