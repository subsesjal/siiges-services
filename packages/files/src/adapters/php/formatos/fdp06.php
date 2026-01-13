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
$usuario = $solicitud['usuario'] ?? [];
$docentes = $programa['docentes'] ?? [];
$domicilioPlantel = $plantel['domicilio'] ?? [];

$cicloTxt = ["SEMESTRALES", "CUATRIMESTRALES", "ANUALES", "SEMESTRALES", "CUATRIMESTRALES"];
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
    'TERCERO',
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

$cicloId = (int) ($ciclo['id'] ?? 1);
$cicloIdx = max(0, min(count($cicloTxt) - 1, $cicloId - 1));

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->Ln(25);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFillColor(115, 199, 209);
$pdf->Cell(140, 5, "", 0, 0, "L");
$pdf->Cell(35, 6, "FDP06", 0, 0, "R", true);
$pdf->Ln(10);

$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 5, safe_iconv("PLANTILLA DOCENTE DE ASIGNATURA Ó TIEMPO COMPLETO"), 0, 1, "L");
$pdf->SetTextColor(0, 0, 0);
$pdf->Ln(5);

$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? date("Y-m-d");
$fechaFormateada = date("d/m/Y", strtotime($fechaRaw));
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

$calle = $domicilioPlantel['calle'] ?? '';
$telefono = ("  Tel - " . $plantel['telefono1'] . ", " . $plantel['telefono2'] . ", " . $plantel['telefono3']) ?? '';
$domPlantel = trim("$calle $telefono");

$dataPrograma = [
    ["name" => "NOMBRE DE LA INSTITUCIÓN", "description" => $institucion["nombre"] ?? ""],
    ["name" => "NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS", "description" => ($nivel["descripcion"] ?? "") . " en " . ($programa["nombre"] ?? "")],
    ["name" => "DURACIÓN DEL PROGRAMA", "description" => ($programa["duracionPeriodos"] ?? '') . ' - PERIODOS ' . ($cicloTxt[$cicloIdx] ?? '')],
    ["name" => "TIPO DE TRÁMITE", "description" => $tituloTipoSolicitud[($solicitud["tipoSolicitudId"] ?? 0)] ?? ""],
    ["name" => "DOMICILIO Y NÚMERO DE TELÉFONO", "description" => $domPlantel],
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

$asignaturasPorGrado = [];
foreach ($docentes as $docente) {
    foreach ($docente['asignaturasDocentes'] as $asigDoc) {
        $gradoId = $asigDoc['asignatura']['gradoId'] ?? null;
        if ($gradoId !== null) {
            $asignaturasPorGrado[$gradoId][] = [
                'docente' => $docente,
                'asignatura' => $asigDoc['asignatura']
            ];
        }
    }
}
ksort($asignaturasPorGrado);

$colWidths = [20, 35, 18, 25, 20, 25, 15, 20];
$pdf->SetColWidths($colWidths);

foreach ($asignaturasPorGrado as $gradoId => $items) {
    if ($pdf->GetY() > 200) {
        $pdf->AddPage("P", "Letter");
        $pdf->Ln(25);
        $pdf->SetFont("Nutmegb", "", 11);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFillColor(115, 199, 209);
        $pdf->Cell(140, 5, "", 0, 0, "L");
        $pdf->Cell(35, 6, "FDP06", 0, 0, "R", true);
        $pdf->Ln(10);
        $pdf->SetTextColor(0, 0, 0);
    }

    $idx = max(0, min(count($gradoTxt) - 1, (int) $gradoId - 1));
    $tituloGrado = $gradoTxt[$idx];
    $pdf->SetFillColor(255, 161, 61);
    $pdf->SetFont("Nutmegb", "", 9);

    $cicloNombre = $cicloTxtSingular[$cicloIdx] ?? '';
    $pdf->Cell(array_sum($colWidths), 5, safe_iconv("$tituloGrado $cicloNombre"), 1, 1, "C", true);

    $pdf->SetFillColor(255, 213, 176);
    $headers = [
        "NOMBRE DEL DOCENTE",
        "FORMACIÓN PROFESIONAL",
        "DOCUMENTO PRESENTADO",
        "ASIGNATURA PROPUESTA",
        "EXPERIENCIA",
        "CONTRATO, ANTIGUEDAD",
        "SE ACEPTA",
        "TIPO DOCENTE"
    ];

    foreach ($headers as $i => $header) {
        $pdf->SetFont("Nutmegb", "", ($header === "DOCUMENTO PRESENTADO") ? 3 : 4);
        $pdf->Cell($colWidths[$i], 10, safe_iconv($header), 1, 0, "C", true);
    }
    $pdf->Ln();

    $pdf->SetFont("Nutmeg", "", 6);
    foreach ($items as $entry) {
        $docente = $entry['docente'];
        $asignatura = $entry['asignatura'];

        $nombreDocente = trim(
            ($docente["persona"]["nombre"] ?? '') . ' ' .
            ($docente["persona"]["apellidoPaterno"] ?? '') . ' ' .
            ($docente["persona"]["apellidoMaterno"] ?? '')
        );

        $formaciones = $docente["formacionesDocentes"] ?? [];
        $formacionNombre = "";
        foreach ($formaciones as $f) {
            $nivelId = $f["formacion"]["nivelId"] ?? null;
            $nivelTexto = $nivelesTexto[$nivelId] ?? '';
            $nombreFormacion = $f["formacion"]["nombre"] ?? '';
            $linea = trim(($nivelTexto ? "$nivelTexto en " : '') . $nombreFormacion);
            if ($linea) {
                $formacionNombre .= $linea . "\n \n";
            }
        }
        $formacionNombre = trim($formacionNombre);

        $ultimaFormacion = end($formaciones);
        $documento = $ultimaFormacion["formacion"]["descripcion"] ?? '';

        $tipoContrato = match ($docente["tipoContratacion"] ?? 0) {
            1 => "CONTRATO",
            2 => "TIEMPO INDEFINIDO",
            3 => "OTRO",
            default => "",
        };

        $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);

        $pdf->RowBlanco([
            safe_iconv(mb_strtoupper($nombreDocente)),
            safe_iconv(mb_strtoupper($formacionNombre)),
            safe_iconv(mb_strtoupper($documento)),
            safe_iconv(mb_strtoupper($asignatura["nombre"]) ?? ""),
            safe_iconv(mb_strtoupper($docente["experiencias"]) ?? ""),
            safe_iconv($tipoContrato . ', ' . (($docente["antiguedad"] ?? '') . " AÑOS")),
            safe_iconv(($docente["esAceptado"] ?? false) ? "ACEPTADO" : "PENDIENTE"),
            safe_iconv($docente["tipoDocente"] == 1 ? "ASIGNATURA" : "TIEMPO COMPLETO")
        ]);
    }

    $pdf->Ln(5);
}

$fechaAut = null;
foreach ($docentes as $docente) {
    foreach ($docente["asignaturasDocentes"] ?? [] as $asigDoc) {
        if (!empty($asigDoc["asignatura"]["fechaAutorizacion"])) {
            $fechaAut = $asigDoc["asignatura"]["fechaAutorizacion"];
            break 2;
        }
    }
}

$meses = [
    '01' => 'enero',
    '02' => 'febrero',
    '03' => 'marzo',
    '04' => 'abril',
    '05' => 'mayo',
    '06' => 'junio',
    '07' => 'julio',
    '08' => 'agosto',
    '09' => 'septiembre',
    '10' => 'octubre',
    '11' => 'noviembre',
    '12' => 'diciembre',
];

$fechaTimestamp = $fechaAut ? strtotime($fechaAut) : time();
$dia = date('d', $fechaTimestamp);
$mes = $meses[date('m', $fechaTimestamp)];
$anio = date('Y', $fechaTimestamp);
$fechaFormateadaLarga = "$dia de $mes del $anio";

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 8);

if ($pdf->checkNewPage()) {
    $pdf->Ln(20);
}

$posY = $pdf->GetY();
$pdf->SetXY(20, $posY);
$pdf->MultiCell(0, 5, safe_iconv(mb_strtoupper(trim(
    ($usuario["persona"]['nombre'] ?? '') . "\n" .
    ($usuario["persona"]['apellidoPaterno'] ?? '') . ' ' .
    ($usuario["persona"]['apellidoMaterno'] ?? '')
))), 0, "L");

$pdf->SetXY(20, $posY + 5);
$pdf->MultiCell(0, 5, safe_iconv(mb_strtoupper($fechaFormateadaLarga)), 0, "C");

$anchoFirma = 60;
$pageWidth = $pdf->GetPageWidth();
$margenDerecho = 20;
$posX = $pageWidth - $margenDerecho - $anchoFirma;
$pdf->SetXY($posX, $posY);

$pdf->MultiCell(
    $anchoFirma,
    5,
    safe_iconv("MTRA. ADRIANA CIBRIÁN SUÁREZ\nDIRECTORA GENERAL DE\nINCORPORACIÓN Y SERVICIOS\nESCOLARES"),
    0,
    "C",
    "T"
);

$pdf->Output("I", "FDP06.pdf");
