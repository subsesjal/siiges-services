<?php
require(realpath(__DIR__ . "/../formatos/pdf.php"));

function safe_iconv($string)
{
  if (is_array($string)) {
    $string = implode(", ", $string);
  }
  return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', (string)$string);
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

$rector = $solicitud['rector'] ?? [];
$formacionesRector = $rector['formaciones'] ?? [];

$director = $solicitud['director'] ?? [];
$formacionesDirector = $director['formaciones'] ?? [];

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

// Crear PDF
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

// Encabezado
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

// Fecha
$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? date("Y-m-d");
$fechaFormateada = date("d/m/Y", strtotime($fechaRaw));
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

// Datos generales de la institución y programa
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
$pdf->SetColors([[255, 161, 61], [255, 255, 255]]); // Títulos grises, datos blancos

foreach ($dataPrograma as $item) {
  $pdf->Row([
    safe_iconv(mb_strtoupper($item['name'])),
    safe_iconv(mb_strtoupper($item['description']))
  ]);
}
$pdf->Ln(5);

// Nivel, Turno, Modalidad, Ciclo
// $sizeCell = 43.5;
$pdf->SetFont("Nutmegb", "", 9);
$pdf->SetFillColor(255, 161, 61);

$pdf->Cell(64, 5, "NIVEL DE ESTUDIO", 1, 0, "C", true);
$pdf->Cell(30, 5, "TURNO", 1, 0, "C", true);
$pdf->Cell(40, 5, "MODALIDAD", 1, 0, "C", true);
$pdf->Cell(40, 5, "CICLO", 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255); // Fondo blanco para los datos

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

$pdf->SetFont("Nutmegb", "", 7);
$pdf->Cell(64, 5, safe_iconv(mb_strtoupper($nivel["descripcion"] ?? "")), 1, 0, "C", true);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(30, 5, safe_iconv(mb_strtoupper(implode(" / ", $turnosTxt))), 1, 0, "C", true);
$pdf->Cell(40, 5, safe_iconv(mb_strtoupper($modalidad["nombre"] ?? "")), 1, 0, "C", true);
$pdf->Cell(40, 5, safe_iconv(mb_strtoupper($ciclo["nombre"] ?? "")), 1, 0, "C", true);
$pdf->Ln(10);

// Domicilio de la institución
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("DOMICILIO DE LA INSTITUCIÓN"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(116, 5, safe_iconv("CALLE Y NÚMERO"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("COLONIA"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255); // Fondo blanco para datos
$pdf->Cell(116, 5, safe_iconv(mb_strtoupper(($domicilioPlantel["calle"] ?? "") . " " . ($domicilioPlantel["numeroExterior"] ?? ""))), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper($domicilioPlantel["colonia"] ?? "")), 1, 0, "C", true);
$pdf->Ln();

// Código Postal, Municipio, Estado
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("CÓDIGO POSTAL"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("DELEGACIÓN O MUNICIPIO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "ENTIDAD FEDERATIVA", 1, 0, "C", true);
$pdf->Ln();

$postal = $domicilioPlantel["codigoPostal"];
$municipio = $domicilioPlantel["municipio"];
$estado = $domicilioPlantel["estado"];

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(58, 5, safe_iconv($domicilioPlantel["codigoPostal"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($municipio["nombre"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($estado["nombre"] ?? ""), 1, 0, "C", true);
$pdf->Ln();

// Teléfonos, redes, correos
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("NÚMERO TELEFÓNICO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "REDES SOCIALES", 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(58, 5, safe_iconv(($plantel["telefono1"] ?? "") . " " . ($plantel["telefono2"] ?? "")), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($plantel["redesSociales"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($plantel["correo1"] ?? ""), 1, 0, "C", true);
$pdf->Ln();
$pdf->Ln();

// ----------------------
// Sección de solicitante
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("DATOS DEL SOLICITANTE (PERSONA FÍSICA O REPRESENTANTE LEGAL DE LA PERSONA JURÍDICA)"), 1, 0, "C", true);
$pdf->Ln();

$dataPersonaSolicitante = [
  ["NOMBRE (S)", $usuario['persona']['nombre'] ?? ""],
  ["APELLIDO PATERNO", $usuario['persona']['apellidoPaterno'] ?? ""],
  ["APELLIDO MATERNO", $usuario['persona']['apellidoMaterno'] ?? ""],
  ["NACIONALIDAD", $usuario['persona']['nacionalidad'] ?? ""],
];

$pdf->SetWidths([80, 94]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);

foreach ($dataPersonaSolicitante as $item) {
  $pdf->Row([
    safe_iconv($item[0]),
    safe_iconv(mb_strtoupper($item[1]))
  ]);
}

// Domicilio del solicitante
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(116, 5, safe_iconv("CALLE Y NÚMERO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "COLONIA", 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(116, 5, safe_iconv(($domicilioPlantel["calle"] ?? "") . " " . ($domicilioPlantel["numeroExterior"] ?? "")), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($domicilioPlantel["colonia"] ?? ""), 1, 0, "C", true);
$pdf->Ln();
$pdf->Ln();

// Seecion del rector
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("DATOS DEL RECTOR"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("NOMBRE (S)"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("APELLIDO PATERNO"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("APELLIDO MATERNO"), 1, 0, "C", true);
$pdf->Ln();

$rector = $institucion["rector"];
$rectorPersona = $rector["persona"];

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255); // Fondo blanco para datos
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper(($rectorPersona["nombre"]))), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper($rectorPersona["apellidoPaterno"])), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper($rectorPersona["apellidoMaterno"])), 1, 0, "C", true);
$pdf->Ln();

// Mas datos del rector
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 7);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO INSTITUCIONAL"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO PERSONAL"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("NÚMERO DE TELÉFONO CELULAR"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(58, 5, safe_iconv($rectorPersona["correoPrimario"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($rectorPersona["correoSecundario"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($rectorPersona["celular"] ?? ""), 1, 0, "C", true);
$pdf->Ln();

// Formaciones del rector
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("FOMACIÓN ACADÉMICA"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(87, 5, safe_iconv("GRADO EDUCATIVO"), 1, 0, "C", true);
$pdf->Cell(87, 5, safe_iconv("NOMBRE DE LOS ESTUDIOS"), 1, 0, "C", true);
$pdf->Ln();

$formaciones = $rector["formacionesRectores"];
$formacionRector = $formaciones[0]["formacion"];

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

$nivelId = $formacionRector["nivelId"] ?? null;
$nivelDescripcion = $niveles[$nivelId] ?? 'SIN ESPECIFICAR';

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255); // Fondo blanco para datos
$pdf->Cell(87, 5, safe_iconv(mb_strtoupper($nivelDescripcion)), 1, 0, "C", true);
$pdf->Cell(87, 5, safe_iconv(mb_strtoupper($formacionRector["nombre"] ?? "")), 1, 0, "C", true);
$pdf->Ln();

// Mas datos de formaciones del rector
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 7);
$pdf->Cell(174, 5, safe_iconv("NOMBRE DE LA INSTITUCIÓN EDUCATIVA DE PROCEDENCIA"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(174, 5, safe_iconv($formacionRector["institucion"] ?? ""), 1, 0, "C", true);
$pdf->Ln();

$pdf->AddPage();

// Seccion del director
$pdf->Ln(20);
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("DATOS DEL DIRECTOR"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("NOMBRE (S)"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("APELLIDO PATERNO"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("APELLIDO MATERNO"), 1, 0, "C", true);
$pdf->Ln();

$director = $plantel["directores"];
$directorPersona = $director[0]["persona"];

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper(($directorPersona["nombre"]))), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper($directorPersona["apellidoPaterno"])), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv(mb_strtoupper($directorPersona["apellidoMaterno"])), 1, 0, "C", true);
$pdf->Ln();

// Mas datos del rector
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 7);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO INSTITUCIONAL"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO PERSONAL"), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("NÚMERO DE TELÉFONO CELULAR"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(58, 5, safe_iconv($directorPersona["correoPrimario"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($directorPersona["correoSecundario"] ?? ""), 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv($directorPersona["celular"] ?? ""), 1, 0, "C", true);
$pdf->Ln();

// Formaciones del rector
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("FOMACIÓN ACADÉMICA"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(87, 5, safe_iconv("GRADO EDUCATIVO"), 1, 0, "C", true);
$pdf->Cell(87, 5, safe_iconv("NOMBRE DE LOS ESTUDIOS"), 1, 0, "C", true);
$pdf->Ln();

$formacionesDirector = $director["formacionesDirectores"];
$formDirec = $formacionesDirector[0]["formacion"];

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

$nivelId = $formacionRector["nivelId"] ?? null;
$nivelDescripcion = $niveles[$nivelId] ?? 'SIN ESPECIFICAR';

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255); // Fondo blanco para datos
$pdf->Cell(87, 5, safe_iconv(mb_strtoupper($nivelDescripcion)), 1, 0, "C", true);
$pdf->Cell(87, 5, safe_iconv(mb_strtoupper($formacionRector["nombre"] ?? "")), 1, 0, "C", true);
$pdf->Ln();

// Mas datos de formaciones del rector
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 7);
$pdf->Cell(174, 5, safe_iconv("NOMBRE DE LA INSTITUCIÓN EDUCATIVA DE PROCEDENCIA"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(174, 5, safe_iconv($formacionRector["institucion"] ?? ""), 1, 0, "C", true);
$pdf->Ln();
$pdf->Ln();

// Sección de Personal designado
$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmeg", "", 7);
$pdf->Cell(174, 5, safe_iconv("PERSONAL DESIGNADO PARA REALIZAR DILIGENCIAS PARA EL DESARROLLO Y SEGUIMIENTO DE LA SOLICITUD DE RVOE"), 1, 0, "C", true);
$pdf->Ln();

$diligentePersona = $nombresDiligencias[0]['persona'] ?? [];

$horaInicio = isset($nombresDiligencias[0]['horaInicio']) ? new DateTime($nombresDiligencias[0]['horaInicio']) : null;
$horaFin = isset($nombresDiligencias[0]['horaFin']) ? new DateTime($nombresDiligencias[0]['horaFin']) : null;

$horarioAtencion = '';
if ($horaInicio && $horaFin) {
  $horarioAtencion = $horaInicio->format('H:i') . ' - ' . $horaFin->format('H:i');
}

$personalDesignado = [
  ["NOMBRE COMPLETO", 
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

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetWidths([80, 94]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);

foreach ($personalDesignado as $item) {
  $pdf->Row([
    safe_iconv($item[0]),
    safe_iconv(mb_strtoupper($item[1]))
  ]);
}
$pdf->Ln();

// Sección de Nombres propuestos para la institución educativa
$pdf->SetFillColor(255, 161, 61);
$pdf->Cell(174, 5, safe_iconv("NOMBRES PROPUESTOS PARA LA INSTITUCIÓN EDUCATIVA"), 1, 0, "C", true);
$pdf->Ln();

$nombresPropuestos = [
  ["NOMBRE PROPUESTO 1", $ratificacion[0]['nombrePropuesto1'] ?? ""],
  ["NOMBRE PROPUESTO 2", $ratificacion[0]['nombrePropuesto2'] ?? ""],
  ["NOMBRE PROPUESTO 3", $ratificacion[0]['nombrePropuesto3'] ?? ""],
];

$pdf->SetWidths([80, 94]);
$pdf->SetLineHeight(5);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);

foreach ($nombresPropuestos as $item) {
  $pdf->Row([
    safe_iconv($item[0]),
    safe_iconv(mb_strtoupper($item[1]))
  ]);
}

// Firma final
$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv("BAJO PROTESTA DE DECIR VERDAD"), 0, 1, "C");
$pdf->SetFont("Nutmegb", "", 11);
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper(trim(
      ($usuario["persona"]['nombre'] ?? '') . ' ' . 
      ($usuario["persona"]['apellidoPaterno'] ?? '') . ' ' . 
      ($usuario["persona"]['apellidoMaterno'] ?? '')
    ) ?? "")), 0, 1, "C");

// Generar PDF
$pdf->Output("I", "FDA02.pdf");
