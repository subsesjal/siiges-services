<?php
require(realpath(__DIR__ . "/../formatos/pdf.php"));

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

class FDP02PDF extends PDF
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
      $this->Cell(35, 6, "FDP02", 0, 0, "R", true);
      $this->Ln(10);
      $this->SetTextColor(115, 199, 209);
      $this->SetX(20);
      $this->Cell(0, 5, safe_iconv("PLAN DE ESTUDIOS"), 0, 1, "L");
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
$modalidad = $programa['modalidad'] ?? [];
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];
$usuario = $solicitud['usuario'] ?? [];
$persona = $usuario['persona'] ?? [];
$ratificacion = $institucion['ratificacionesNombre'] ?? [];
$ciclo = $programa['ciclo'] ?? [];

$docentes = $programa['docentes'] ?? [];
$domicilioPlantel = $plantel['domicilio'] ?? [];

$cicloTxt = ["SEMESTRALES", "CUATRIMESTRALES", "ANUALES", "SEMESTRALES", "CUATRIMESTRALES"];
$duracionCicloTxt = ["SEMESTRAL", "CUATRIMESTRAL", "ANUAL", "SEMESTRAL", "CUATRIMESTRAL"];
$cicloTxtSingular = ["SEMESTRE", "CUATRIMESTRE", "AÑO", "SEMESTRE", "CUATRIMESTRE"];
$tituloTipoSolicitud = [
  "SOLICITUD DE RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS",
  "SOLICITUD DE REFRENDO A PLAN Y PROGRAMA DE ESTUDIO",
  "SOLICITUD DE CAMBIO DE DOMICILIO",
  "SOLICITUD DE CAMBIO DE REPRESENTANTE LEGAL"
];
$gradoTxt = [
  'PRIMER',
  'SEGUNDO',
  'TERCER',
  'CUARTO',
  'QUINTO',
  'SEXTO',
  'SÉPTIMO',
  'OCTAVO',
  'NOVENO',
  'DÉCIMO',
  'UNDÉCIMO',
  'DUODÉCIMO',
  'OPTATIVA',
];
$nivelesTexto = [
  1 => "Licenciatura",
  2 => "Técnico Superior Universitario",
  3 => "Especialidad",
  4 => "Maestría",
  5 => "Doctorado",
  6 => "Profesional Asociado",
];

$antecedentesMap = [
  "1" => "Bachillerato",
  "2" => "Licenciatura",
  "3" => "Técnico Superior Universitario",
  "4" => "Especialidad",
  "5" => "Maestría",
  "6" => "Doctorado",
  "7" => "Profesional Asociado",
  "8" => "Educación Continua"
];

$antecedenteId = (string)($programa["antecedenteAcademico"] ?? "");
$antecedenteDesc = $antecedentesMap[$antecedenteId] ?? "";

$cicloId = (int) ($ciclo['id'] ?? 1);
$cicloIdx = max(0, min(count($cicloTxt) - 1, $cicloId - 1));

$pdf = new FDP02PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);
$pdf->SetAutoPageBreak(true, 30);

$pdf->SetFont("Nutmeg", "", 9);
// $fechaRaw = $solicitud["fecha"] ?? null;
// $fechaFormateada = $fechaRaw ? date("d/m/Y", strtotime($fechaRaw)) : "";
// $pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

$calle = $domicilioPlantel['calle'] ?? '';
$telefono = ("  Tel - " . $plantel['telefono1'] . ", " . $plantel['telefono2'] . ", " . $plantel['telefono3']) ?? '';
$domPlantel = trim("$calle $telefono");

$dataPrograma = [
  ["name" => "MODALIDAD", "description" => $modalidad["nombre"] ?? ""],
  ["name" => "DURACIÓN DEL CICLO", "description" => $duracionCicloTxt[$cicloIdx] ?? ""],
  ["name" => "DURACIÓN DEL PLAN DE ESTUDIOS", "description" => ($programa["duracionPeriodos"] ?? '') . ' - PERIODOS ' . ($cicloTxt[$cicloIdx] ?? '')],
  ["name" => "CLAVE DEL PLAN DE ESTUDIOS", "description" => $solicitud["folio"] ?? ""],
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

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("1. ANTECEDENTES ACADÉMICOS DE INGRESO"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($antecedenteDesc), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("2. MÉTODOS DE INDUCCIÓN"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["metodosInduccion"] ?? ""), 1, "J", true);
$pdf->Ln();

$perfilIngresoConocimientos = $programa["perfilIngresoConocimientos"] ?? "";
$perfilIngresoHabilidades = $programa["perfilIngresoHabilidades"] ?? "";
$perfilIngresoActitudes = $programa["perfilIngresoActitudes"] ?? "";

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("3. PERFIL DE INGRESO"), 1, 0, "C", true);
$pdf->Ln();

$bloquesPerfil = [
  ["CONOCIMIENTOS", $perfilIngresoConocimientos],
  ["HABILIDADES", $perfilIngresoHabilidades],
  ["ACTITUDES", $perfilIngresoActitudes],
];

foreach ($bloquesPerfil as [$titulo, $texto]) {
  $pdf->SetFillColor(255, 213, 176);
  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->ExpandHeaderRow($pdf, [safe_iconv($titulo)], [174]);

  $pdf->SetFillColor(255, 255, 255);
  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->MultiCell(174, 5, safe_iconv($texto ?? ""), 1, "J", true);
}
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("4. PROCESO DE SELECCIÓN DE ESTUDIANTES"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["procesoSeleccion"] ?? ""), 1, "J", true);
$pdf->Ln();

$perfilEgresoConocimientos = $programa["perfilEgresoConocimientos"] ?? "";
$perfilEgresoHabilidades = $programa["perfilEgresoHabilidades"] ?? "";
$perfilEgresoActitudes = $programa["perfilEgresoActitudes"] ?? "";

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("5. PERFIL DE EGRESO"), 1, 0, "C", true);
$pdf->Ln();

$bloquesEgreso = [
  ["CONOCIMIENTOS", $perfilEgresoConocimientos],
  ["HABILIDADES", $perfilEgresoHabilidades],
  ["ACTITUDES", $perfilEgresoActitudes],
];

foreach ($bloquesEgreso as [$titulo, $texto]) {
  $pdf->SetFillColor(255, 213, 176);
  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->ExpandHeaderRow($pdf, [safe_iconv($titulo)], [174]);

  $pdf->SetFillColor(255, 255, 255);
  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->MultiCell(174, 5, safe_iconv($texto ?? ""), 1, "J", true);
}
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("6. MAPA CURRICULAR"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["mapaCurricular"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("7. FLEXIBILIDAD CURRICULAR"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["flexibilidadCurricular"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("8. OBJETIVO GENERAL DEL PLAN DE ESTUDIOS"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["objetivoGeneral"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("9. OBJETIVOS PARTICULARES Y/ O COMPETENCIAS DEL PLAN DE ESTUDIOS"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["objetivosParticulares"] ?? ""), 1, "J", true);
$pdf->Ln();

$ciclo = $programa['ciclo'] ?? [];

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 6, safe_iconv("10. ESTRUCTURA DEL PLAN DE ESTUDIOS"), 1, 1, "C", true);

$AREA_NAMES = [
  1 => 'Formación General',
  2 => 'Formación Básica',
  3 => 'Formación Disciplinar',
  4 => 'Formación Electiva',
  5 => 'Formación Técnica',
  6 => 'Formación Especializante',
];
$getAreaName = function ($id) use ($AREA_NAMES) {
  return $AREA_NAMES[$id] ?? ''; };

$getSemesterTitle = function (int $gradoId) use ($gradoTxt, $cicloTxtSingular, $ciclo) {
  $iGrado = max(0, min(count($gradoTxt) - 1, $gradoId - 1));
  $pref = $gradoTxt[$iGrado];

  $idCiclo = (int) ($ciclo['id'] ?? 1);
  $iCiclo = max(0, min(count($cicloTxtSingular) - 1, $idCiclo - 1));
  $cicloTx = $cicloTxtSingular[$iCiclo];

  return "$pref $cicloTx";
};

$asignaturas = $programa['asignaturas'] ?? [];

$totDocCarrera = 0;
$totIndCarrera = 0;
$totCredCarrera = 0;

if (is_array($asignaturas) && count($asignaturas)) {
  usort($asignaturas, function ($a, $b) {
    $ga = (int) ($a['gradoId'] ?? 0);
    $gb = (int) ($b['gradoId'] ?? 0);
    if ($ga !== $gb)
      return $ga <=> $gb;
    $oa = (int) ($a['orden'] ?? 9999);
    $ob = (int) ($b['orden'] ?? 9999);
    if ($oa !== $ob)
      return $oa <=> $ob;
    return strcmp(mb_strtoupper($a['nombre'] ?? ''), mb_strtoupper($b['nombre'] ?? ''));
  });

  $porSem = [];
  foreach ($asignaturas as $asig) {
    $g = (int) ($asig['gradoId'] ?? 0);
    if ($g) {
      $porSem[$g][] = $asig;
    }
  }

  $colWidths = [25, 40, 15, 20, 18, 18, 15, 23];
  $encabezados = [
    "ÁREA",
    "ASIGNATURA O UNIDAD\nDE APRENDIZAJE",
    "CLAVE",
    "SERIACIÓN",
    "HORAS\nDOCENTE",
    "HORAS\nINDEP.",
    "CRÉDITOS",
    "INSTALACIONES"
  ];

  foreach ($porSem as $gradoId => $lista) {
    $lineHeightHeader = 5;
    $headerLinesMax = 1;
    foreach ($encabezados as $txt) {
      $headerLinesMax = max($headerLinesMax, substr_count($txt, "\n") + 1);
    }
    $headerHeight   = $headerLinesMax * $lineHeightHeader;
    $tituloHeight   = 6;
    $reservaPrimera = 3 * ($pdf->lineHeight ?? 5);
    $bottomMargin   = 20;

    $needed = $tituloHeight + $headerHeight + $reservaPrimera;
    $pageH  = $pdf->GetPageHeight();

    if ($pdf->GetY() + $needed > ($pageH - $bottomMargin)) {
      $pdf->AddPage('P', 'Letter');
      $pdf->Ln(5);
    }

    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 9);
    $pdf->Cell(174, 6, safe_iconv(mb_strtoupper($getSemesterTitle($gradoId))), 1, 1, "C", true);

    $pdf->SetFont("Nutmeg", "", 6);
    $pdf->SetFillColor(255, 213, 176);
    $pdf->ExpandHeaderRow($pdf, $encabezados, $colWidths, 5, 1, 'C', true);

    $totalDoc = 0;
    $totalIndep = 0;
    $totalCred = 0;

    $pdf->SetFont("Nutmeg", "", 8);
    $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
    $pdf->SetWidths($colWidths);
    $pdf->SetAligns(["C", "C", "C", "C", "C", "C", "C", "C"]);

    foreach ($lista as $asig) {
      $horDoc = (int) ($asig['horasDocente'] ?? 0);
      $horInd = (int) ($asig['horasIndependiente'] ?? 0);
      $credit = (int) ($asig['creditos'] ?? 0);

      $totalDoc += $horDoc;
      $totalIndep += $horInd;
      $totalCred += $credit;

      // Acumular totales de la carrera
      $totDocCarrera += $horDoc;
      $totIndCarrera += $horInd;
      $totCredCarrera += $credit;

      $pdf->RowBlanco([
        safe_iconv($getAreaName($asig['areaId'] ?? null)),
        safe_iconv($asig['nombre'] ?? ""),
        safe_iconv($asig['clave'] ?? ""),
        safe_iconv($asig['seriacion'] ?? ""),
        safe_iconv((string) $horDoc),
        safe_iconv((string) $horInd),
        safe_iconv((string) $credit),
        safe_iconv($asig['academia'] ?? "")
      ]);
    }

    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 8);
    $pdf->Cell(58, 6, safe_iconv("TOTAL DOCENTE:  " . $totalDoc), 1, 0, "C", true);
    $pdf->Cell(58, 6, safe_iconv("TOTAL INDEP:  " . $totalIndep), 1, 0, "C", true);
    $pdf->Cell(58, 6, safe_iconv("TOTAL CRÉDITOS:  " . $totalCred), 1, 1, "C", true);

    $pdf->Ln(10);
  }

  $pdf->SetFont("Nutmegb", "", 9);
  $pdf->SetLineHeight(6);
  $pdf->SetWidths([130, 44]);
  $pdf->SetAligns(["L", "L"]);

  $totales = [
    [
      "label" => "TOTAL DE HORAS DE TRABAJO BAJO LA CONDUCCIÓN DE UN DOCENTE DURANTE TODA LA CARRERA",
      "value" => $totDocCarrera . " HORAS",
    ],
    [
      "label" => "TOTAL DE HORAS DE TRABAJO DE MANERA INDEPENDIENTE DURANTE TODA LA CARRERA",
      "value" => $totIndCarrera . " HORAS",
    ],
    [
      "label" => "TOTAL DE CRÉDITOS DE LA CARRERA",
      "value" => $totCredCarrera . " CRÉDITOS",
    ],
  ];

  $pdf->SetColors([[255, 161, 61], [255, 255, 255]]);

  foreach ($totales as $t) {
    $pdf->RowBlanco([
      safe_iconv(mb_strtoupper($t["label"])),
      safe_iconv(mb_strtoupper($t["value"])),
    ]);
  }

  $pdf->Ln(5);

} else {
  // Sin asignaturas
  $pdf->SetFillColor(255, 255, 255);
  $pdf->SetFont("Nutmeg", "", 8);
  $pdf->Cell(174, 6, safe_iconv("SIN ASIGNATURAS REGISTRADAS"), 1, 1, "C", true);
  $pdf->Ln();
}

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("13. ACTUALIZACIÓN DEL PLAN DE ESTUDIOS"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["actualizacion"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("14. PROYECTO DE SEGUIMIENTO A EGRESADOS"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["seguimientoEgresados"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 8);
$pdf->Cell(174, 5, safe_iconv("15. VINCULACIÓN CON COLEGIOS DE PROFESIONISTAS, ACADEMIAS, ASOCIACIONES PROFESIONALES, ETC."), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->MultiCell(174, 5, safe_iconv($programa["conveniosVinculacion"] ?? ""), 1, "J", true);
$pdf->Ln();

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 10);
$pdf->Cell(0, 5, safe_iconv("FECHA DE AUTORIZACIÓN"), 0, 1, "C");
$pdf->Ln(15); // espacio

// Línea horizontal
$lineWidth = 90; // ancho de la línea
$margin = (210 - $lineWidth) / 2; // centrado para A4 en mm, ajusta si usas Letter
$pdf->SetX($margin);
$pdf->Cell($lineWidth, 0, "", 'T', 1, "C");
$pdf->Ln(2);

// Texto fijo de la autoridad
$pdf->MultiCell(0, 5, safe_iconv("ING. MARCO ARTURO CASTRO\nAGUILERA\nDIRECTOR GENERAL DE\nINCORPORACIÓN Y SERVICIOS\nESCOLARES"), 0, "C");

echo $pdf->Output('S');
