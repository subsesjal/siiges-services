<?php
require(realpath(__DIR__ . "/../formatos/pdf.php"));

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Optional: write uncaught exceptions to stderr
set_exception_handler(function ($e) {
  file_put_contents('php://stderr', "Uncaught Exception: " . $e->getMessage() . "\n");
  file_put_contents('php://stderr', $e->getTraceAsString() . "\n");
  exit(1);
});

set_error_handler(function ($severity, $message, $file, $line) {
  file_put_contents('php://stderr', "Error [$severity]: $message in $file on line $line\n");
  exit(1);
});

// Función segura para convertir texto UTF-8 a ISO-8859-1
function safe_text($text) {
  if ($text === null || $text === '') {
    return '';
  }
  // Limpiar caracteres problemáticos (espacios no rompibles, etc.)
  $text = preg_replace('/[\x{00A0}\x{2000}-\x{200F}\x{2028}\x{2029}\x{202F}\x{205F}\x{3000}]/u', ' ', $text);
  // Convertir usando mb_convert_encoding que es más tolerante
  $converted = @mb_convert_encoding($text, 'ISO-8859-1', 'UTF-8');
  if ($converted === false) {
    // Fallback: eliminar caracteres no ASCII
    return preg_replace('/[^\x20-\x7E]/', '', $text);
  }
  return $converted;
}

// Leer datos JSON desde stdin
$data = json_decode(file_get_contents('php://stdin'), true);

// Verifica si el JSON es válido
if (!$data) {
  fwrite(STDERR, "No se recibieron datos válidos o el JSON está malformado.\n");
  exit(1);
}


// make new object
$pdf = new PDF();

$alumno = $data['alumno'] ?? [];
$calificacionesInput = $data['calificaciones'] ?? [];
$programa = $alumno['programa'] ?? [];
$nivel = $programa['nivel'] ?? [];
$modalidad = $programa['modalidad'] ?? [];
$ciclo = $programa['ciclo'] ?? [];
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];

$pdf->AliasNbPages();

$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);
$pdf->SetFont("Nutmeg", "", 11);

$pdf->Ln(30);
$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 5, safe_text("HISTORIAL ACADÉMICO"), 0, 1, "L");
$pdf->Ln(5);
$pdf->SetTextColor(0, 0, 0);

// Tabla de encabezado Datos generales de la institución y programa
$pdf->SetFont("Nutmeg", "", 9);
$dataPrograma = array(
  [
    "name" => safe_text("NOMBRE DE LA INSTITUCIÓN"),
    "description" => safe_text(mb_strtoupper($institucion["nombre"] ?? ''))
  ],
  [
    "name" => safe_text("CLAVE DE CENTRO DE TRABAJO"),
    "description" => safe_text(mb_strtoupper($plantel["claveCentroTrabajo"] ?? ''))
  ],
  [
    "name" => safe_text("NUMERO DE ACUERDO"),
    "description" => safe_text(mb_strtoupper($programa["acuerdoRvoe"] ?? ''))
  ],
  [
    "name" => safe_text("NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS"),
    "description" => safe_text(mb_strtoupper(($nivel["descripcion"] ?? '') . " en " . ($programa["nombre"] ?? '')))
  ],
);

//set widht for each column (6 columns)
$pdf->SetWidths(array(80, 95));

//set line height
$pdf->SetLineHeight(5);

$pdf->SetColors([[191, 191, 191], []]);

foreach ($dataPrograma as $item) {
  // write data using Row() method containing array of values
  $pdf->Row(array(
    $item['name'],
    $item['description']
  ));
}

$pdf->Ln(10);
// Datos del alumno
$pdf->SetFillColor(166, 166, 166);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(176, 5, safe_text("DATOS DEL ALUMNO"), 1, 1, "C", true);

// add table heading using standard cells
$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(191, 191, 191);
$pdf->Cell(29, 5, safe_text("MATRÍCULA"), 1, 0, "C", true);
$pdf->Cell(89, 5, safe_text("NOMBRE DEL ALUMNO"), 1, 0, "C", true); // Ajustado a 89
$pdf->Cell(29, 5, safe_text("ESTATUS"), 1, 0, "C", true);
$pdf->Cell(29, 5, safe_text("VALIDACIÓN"), 1, 1, "C", true);

// Tabla de domicilio de la institucion
$dataDetalleDomicilioInstitucion1 = array(
  [
    "matricula" => safe_text(mb_strtoupper($alumno["matricula"] ?? '')),
    "nombre_alumno" => safe_text(mb_strtoupper(($alumno["persona"]["apellidoPaterno"] ?? '') . " " . ($alumno["persona"]["apellidoMaterno"] ?? '') . " " . ($alumno["persona"]["nombre"] ?? ''))),
    "estatus" => safe_text(mb_strtoupper($alumno["situacion"]["nombre"] ?? '')),
    "validaciones" => safe_text(mb_strtoupper($alumno["validacion"]["situacionValidacion"]['nombre'] ?? '')),
  ]
);

//set widht for each column (6 columns)
$pdf->SetWidths(array(29, 89, 29, 29));

//set line height
$pdf->SetLineHeight(5);
$pdf->SetColors([]);
$pdf->SetFont("Nutmeg", "", 9);

foreach ($dataDetalleDomicilioInstitucion1 as $item) {
  // write data using Row() method containing array of values
  $pdf->Row(array(
    $item['matricula'],
    $item['nombre_alumno'],
    $item['estatus'],
    $item['validaciones']
  ));
}

$pdf->Ln(10);

$total_creditos = 0;
$total_calificaciones = 0;
$total_materias = 0;
$calificacionCiclo = [];

foreach ($calificacionesInput as $calificacion) {
  $asignatura = $calificacion['asignatura'] ?? [];
  $grupo = $calificacion['grupo'] ?? [];
  $cicloEscolar = $grupo['cicloEscolar'] ?? [];

  // Agregar campo tipo_txt (como en el código original)
  $tipoTxt = match ($asignatura['tipo'] ?? '') {
    '1' => 'Ordinario',
    '2' => 'Extraordinario',
    default => 'Desconocido'
  };
  $asignatura['tipo_txt'] = $tipoTxt;

  // Agregar consecutivo
  $calificacion['consecutivo'] = (int) ($asignatura['consecutivo'] ?? 0);

  // Insertar datos enriquecidos
  $calificacion['asignatura'] = $asignatura;
  $calificacion['ciclo_escolar'] = $cicloEscolar;

  $nombreCiclo = $cicloEscolar['nombre'] ?? 'Sin Ciclo';

  if (!isset($calificacionCiclo[$nombreCiclo])) {
    $calificacionCiclo[$nombreCiclo] = [];
  }

  $calificacionCiclo[$nombreCiclo][] = $calificacion;
}

foreach ($calificacionCiclo as $ciclos => $ciclo) {
  if ($pdf->checkNewPage()) {
    $pdf->Ln(20);
  }

  $ciclo = $pdf->array_sort($ciclo, 'consecutivo', SORT_ASC);
  $pdf->SetFillColor(166, 166, 166);
  $pdf->SetFont("Nutmeg", "", 9);
  $pdf->Cell(176, 5, safe_text(mb_strtoupper('CICLO ESCOLAR ' . $ciclos)), 1, 1, "C", true);

  $pdf->SetFont("Nutmegb", "", 7);

  $pdf->SetFillColor(191, 191, 191);
  $pdf->Cell(16, 8, safe_text("CLAVE"), 1, 0, "C", true);
  $pdf->Cell(17, 8, safe_text("SERIACIÓN"), 1, 0, "C", true);
  $pdf->Cell(65, 8, safe_text("ASIGNATURA O UNIDAD DE APRENDIZAJE"), 1, 0, "C", true);
  $pdf->Cell(22, 8, safe_text("TIPO"), 1, 0, "C", true);
  $pdf->Cell(16, 8, safe_text("CALI."), 1, 0, "C", true);
  $pdf->Cell(13, 8, safe_text("CRED."), 1, 0, "C", true);
  $pdf->MultiCell(27, 4, safe_text("FECHA DE ACREDITACIÓN"), 1, "C", true);

  $pdf->Ln(0);

  foreach ($ciclo as $calificaciones => $detalle) {

    $area_txt = "";
    switch ($detalle["tipo"]) {
      case 1:
        $tipo_txt = "Ordinario";
        break;
      case 2:
        $tipo_txt = "Extraordinario";
        break;
    }

    $dataCalificacionAsignatura = array(
      [
        "clave_asignatura" => safe_text($detalle["asignatura"]["clave"] ?? ''),
        "seriacion_asignatura" => safe_text($detalle["asignatura"]["seriacion"] ?? ''),
        "nombre_asignatura" => safe_text($detalle["asignatura"]["nombre"] ?? ''),
        "tipo_asignaura" => safe_text($tipo_txt),
        "calificacion" => safe_text($detalle["calificacion"] ?? ''),
        "creditos" => safe_text($detalle["asignatura"]["creditos"] ?? ''),
        "fecha_examen" => safe_text($detalle["fechaExamen"] ?? ''),
      ]
    );

    //set widht for each column (6 columns)
    $pdf->SetWidths(array(16, 17, 65, 22, 16, 13, 27));

    //set line height
    $pdf->SetLineHeight(5);
    $pdf->SetColors([]);
    $pdf->SetFont("Nutmeg", "", 7);

    //Imprime la fila
    foreach ($dataCalificacionAsignatura as $item) {
      // write data using Row() method containing array of values
      $pdf->Row(array(
        $item['clave_asignatura'],
        $item['seriacion_asignatura'],
        $item['nombre_asignatura'],
        $item['tipo_asignaura'],
        $item['calificacion'],
        $item['creditos'],
        $item['fecha_examen']
      ));

      if ($pdf->checkNewPage()) {
        $pdf->Ln(20);
      }
    }

    if (is_numeric($detalle["calificacion"]) && $detalle["calificacion"] >= $programa["calificacionAprobatoria"]) {
      $total_creditos += (float) ($detalle["asignatura"]["creditos"] ?? 0);
      $total_calificaciones += (float) ($detalle["calificacion"] ?? 0);
      $total_materias += 1;
    }
  }

  $pdf->Ln(15);
}
$promedio_calificacion = 0;

// print_r($pdf->programa);
if ($total_materias != 0) {
  $promedio_calificacion = $total_calificaciones / $total_materias;

  if (!empty($programa['calificacionDecimal']) && $programa['calificacionDecimal'] === true) {
    $promedio_calificacion = floor($promedio_calificacion * 10) / 10;
    if (fmod($promedio_calificacion, 1) == 0.0) {
      $promedio_calificacion = (int) $promedio_calificacion;
    }
  } else {
    $promedio_calificacion = round($promedio_calificacion, 0);
  }
}

if ($pdf->checkNewPage()) {
  $pdf->Ln(20);
}

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(191, 191, 191);
$pdf->Cell(50, 5, safe_text("CRÉDITOS OBTENIDOS"), 1, 0, "C", true);
$pdf->Cell(50, 5, safe_text("PROMEDIO"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetFillColor(255, 255, 255);
$pdf->Cell(50, 5, safe_text($total_creditos . " de " . ($programa["creditos"] ?? '')), 1, 0, "C", true);
$pdf->Cell(50, 5, safe_text($promedio_calificacion), 1, 0, "C", true);
$pdf->Ln();

$pdf->Ln(15);

if ($pdf->checkNewPage()) {
  $pdf->Ln(20);
}

// Fecha
$fecha = $pdf->convertirFecha(date("Y-m-d"));
$pdf->SetFont("Nutmegbk", "", 8);
$pdf->MultiCell(176, 3, safe_text("El presente historial consigna las calificaciones que hasta la fecha han sido registradas en el  Sistema Integral de Información para la Gestión de la Educación Superior (SIIGES), el cumplimiento parcial o total del plan de estudios, los créditos obtenidos y la calificación total o parcial serán acreditados solamente por un certificado autorizado.

La información del presente cumple fines informativos, único para la consulta de la Institución y la Dirección de Servicios Escolares, fecha de consulta " . $fecha), 0, "J");
$pdf->Ln(5);

$pdf->Output("I", "kardex_" . ($alumno["matricula"] ?? '') . ".pdf");
