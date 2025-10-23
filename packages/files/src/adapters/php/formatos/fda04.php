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
$personaLimpieza = $plantel['plantelHigienes'] ?? [];
$infraestructuras = $plantel['infraestructuras'] ?? [];
$saludInstituciones = $plantel['saludInstituciones'] ?? [];
$tipoInmueble = $plantel['tipoInmuebleId'] ?? [];
$plantelEdificioNiveles = $plantel['plantelEdificioNiveles'] ?? [];
$edificioNivel = $plantelEdificioNiveles['edificioNivel'] ?? [];
$plantelSeguridadSistemas = $plantel['plantelSeguridadSistemas'] ?? [];

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->Ln(25);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFillColor(115, 199, 209);
$pdf->Cell(140, 5, "", 0, 0, "L");
$pdf->Cell(35, 6, "FDA04", 0, 0, "R", true);
$pdf->Ln(10);

$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 5, safe_iconv("DESCRIPCIÓN DE LAS INSTALACIONES"), 0, 1, "L");
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
    ["name" => "TIPO Y NOMBRE DEL PLAN DE ESTUDIOS", "description" => ($nivel["descripcion"] ?? "") . " en " . ($programa["nombre"] ?? "")],
    ["name" => "MODALIDAD", "description" => $modalidad["nombre"] ?? ''],
    ["name" => "DURACIÓN DEL PROGRAMA", "description" => ($programa["duracionPeriodos"] ?? '') . ' - PERIODOS ' . ($cicloTxt[($ciclo["id"] ?? 1) - 1])],
    [
        "name" => "NOMBRE COMPLETO DE LA PERSONA FÍSICA O JURÍDICA",
        "description" => mb_strtoupper(trim(
            ($usuario["persona"]['nombre'] ?? '') .
            ($usuario["persona"]['apellidoPaterno'] ?? '') .
            ($usuario["persona"]['apellidoMaterno'] ?? '')
        ))
    ],
];

$pdf->SetWidths([80, 95]);
$pdf->SetLineHeight(5);
$pdf->SetFillColor(255, 161, 61);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(175, 5, safe_iconv("1. DATOS DEL PLAN DE ESTUDIOS"), 1, 1, "C", true);
$pdf->SetFont("Nutmeg", "", 9);
foreach ($dataPrograma as $item) {
    $pdf->Row([
        safe_iconv(mb_strtoupper($item['name'])),
        safe_iconv(mb_strtoupper($item['description']))
    ]);
}
$pdf->Ln(5);

// Domicilio de la institución
$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("2. DOMICILIO DE LA INSTITUCIÓN"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 9);
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

// Código Postal, Municipio, Estado
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

// Teléfonos, redes, correos
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(58, 5, safe_iconv("NÚMERO TELEFÓNICO"), 1, 0, "C", true);
$pdf->Cell(58, 5, "REDES SOCIALES", 1, 0, "C", true);
$pdf->Cell(58, 5, safe_iconv("CORREO ELECTRÓNICO"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
$pdf->SetWidths([58, 58, 58]);
$pdf->SetAligns(["C", "C", "C"]);
$pdf->RowBlanco([
  safe_iconv(($plantel["telefono1"] ?? "") . " " . ($plantel["telefono2"] ?? "")),
  safe_iconv($plantel["redesSociales"] ?? ""),
  safe_iconv($plantel["correo1"] ?? "")
]);
$pdf->Ln();

// Seccion de Descripcion del plantel (3)
$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("3. DESCRIPCIÓN DEL PLANTEL"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->Cell(174, 5, safe_iconv("CARACTERÍSTICAS DEL INMUEBLE"), 1, 0, "C", true);

$esConstruido = $tipoInmueble === 1 ? "X" : "";
$esAdaptado   = $tipoInmueble === 2 ? "X" : "";
$esMixto      = $tipoInmueble === 3 ? "X" : "";

// Segunda fila del encabezado
$pdf->SetFont("Nutmeg", "", 9);
$pdf->SetWidths([140, 34]);
$pdf->SetAligns(["C", "C"]);
$pdf->Ln();
$pdf->SetColors([[255, 255, 255], [255, 255, 255]]);

switch ($tipoInmueble) {
  case 1:
    $pdf->RowBlanco([
      safe_iconv("CONSTRUIDO PARA LA ESCUELA"),
      safe_iconv($esConstruido)
    ]);
    $pdf->Ln(-5);
    break;
  case 2:
    $pdf->RowBlanco([
      safe_iconv("ADAPTADO"),
      safe_iconv($esAdaptado)
    ]);
    $pdf->Ln(-5);
    break;
  case 3:
    $pdf->RowBlanco([
      safe_iconv("MIXTO"),
      safe_iconv($esMixto)
    ]);
    $pdf->Ln(-5);
    break;
  default:
    $pdf->SetWidths([174]);
    $pdf->SetAligns(["C"]);
    $pdf->RowBlanco([
      safe_iconv("NO ESPECIFICADO")
    ]);
    $pdf->Ln(-5);
    break;
}

// Edificios y niveles
$nivelesSeleccionados = array_column($plantelEdificioNiveles, 'edificioNivelId');
$niveles = [
  ['id' => 10, 'label' => 'SÓTANO'],
  ['id' => 20, 'label' => 'PLANTA BAJA'],
  ['id' => 1,  'label' => 'PRIMER PISO'],
  ['id' => 2,  'label' => 'SEGUNDO PISO'],
  ['id' => 3,  'label' => 'TERCER PISO'],
  ['id' => 4,  'label' => 'CUARTO PISO'],
];

$pdf->SetFont("Nutmeg", "", 9);
$pdf->Ln();
$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(174, 5, safe_iconv("EDIFICIOS Y/O NIVELES"), 1, 0, "C", true);
$pdf->SetFillColor(255, 255, 255);
$pdf->Ln();
$pdf->SetWidths([140, 34]);
$pdf->SetAligns(["C", "C"]);

foreach ($niveles as $nivel) {
    $pdf->RowBlanco([
        safe_iconv($nivel['label']),
        in_array($nivel['id'], $nivelesSeleccionados) ? "X" : ""
    ]);
}

// Sistema de seguridad
$seguridadPorId = [];
foreach ($plantelSeguridadSistemas as $sistema) {
    $seguridadPorId[$sistema['seguridadSistemaId']] = $sistema['cantidad'];
}

$seguridadCatalogo = [
  1 => 'RECUBRIMIENTOS PLÁSTICOS EN PISOS Y ESCALONES',
  2 => 'ALARMA CONTRA INCENDIOS Y/O TERREMOTOS',
  3 => 'SEÑALAMIENTOS DE EVACUACIÓN',
  4 => 'BOTIQUÍN',
  5 => 'ESCALERA DE EMERGENCIAS',
  6 => 'ÁREA DE SEGURIDAD',
  7 => 'EXTINTORES',
  8 => 'PUNTO DE REUNIÓN PARA EVACUAR',
];

$pdf->SetFillColor(255, 213, 176);
$pdf->Cell(174, 5, safe_iconv("SISTEMA DE SEGURIDAD"), 1, 0, "C", true);
$pdf->Ln();

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->Cell(140, 5, safe_iconv("DESCRIPCIÓN"), 1, 0, "C", true);
$pdf->Cell(34, 5, safe_iconv("No."), 1, 0, "C", true);
$pdf->Ln();
$pdf->SetWidths([140, 34]);
$pdf->SetAligns(["C", "C"]);

foreach ($seguridadCatalogo as $id => $descripcion) {
    $cantidad = $seguridadPorId[$id] ?? '';
    $pdf->RowBlanco([
        safe_iconv($descripcion),
        safe_iconv($cantidad)
    ]);
}
$pdf->Ln();

// Seccion de Higiene del plantel (4)
$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("4. HIGIENE DEL PLANTEL"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->Cell(80, 5, safe_iconv("CONCEPTO"), 1, 0, "C", true);
$pdf->Cell(94, 5, safe_iconv("DESCRIPCIÓN"), 1, 0, "C", true);
$pdf->Ln();

$getCantidad = function ($id) use ($personaLimpieza) {
    foreach ($personaLimpieza as $hig) {
        if ($hig['higieneId'] == $id) {
            return $hig['cantidad'] ?? '0';
        }
    }
    return '0';
};

$sanitariosTexto = implode("\n", [
    "Estudiantes",
    "  Masculino: " . $getCantidad(1),
    "  Femenino: " . $getCantidad(2),
    "",
    "Personal docente y administrativo",
    "  Masculino: " . $getCantidad(3),
    "  Femenino: " . $getCantidad(4),
]);

$dataHigiene = [
    ["name" => "SANITARIOS", "description" => $sanitariosTexto],
    ["name" => "PERSONAL DE LIMPIEZA DEL PLANTEL", "description" => $getCantidad(5)],
    ["name" => "CESTOS DE BASURA EN EL PLANTEL", "description" => $getCantidad(6)],
    ["name" => "AULAS", "description" => $getCantidad(7)],
    ["name" => "BUTACAS", "description" => $getCantidad(8)],
    ["name" => "VENTANAS", "description" => $getCantidad(9)],
    [
        "name" => "VENTILACIÓN",
        "description" =>
            "Ventiladores: " . $getCantidad(10) . "\n" .
            "Aires acondicionados: " . $getCantidad(11)
    ],
];

$pdf->SetWidths([80, 94]);
$pdf->SetLineHeight(5);
$pdf->SetFillColor(255, 161, 61);
$pdf->SetColors([[255, 213, 176], [255, 255, 255]]);
foreach ($dataHigiene as $item) {
    $pdf->RowBlanco([
        safe_iconv(mb_strtoupper($item['name'])),
        safe_iconv(mb_strtoupper($item['description']))
    ]);
}
$pdf->Ln(5);

// Seccion de Infraestructura del programa (5)
$pdf->SetFillColor(255, 161, 61);
$pdf->SetFont("Nutmegb", "", 9);
$pdf->Cell(174, 5, safe_iconv("5. INFRAESTRUCTURA PARA EL PROGRAMA"), 1, 1, "C", true);
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 9);
$pdf->Cell(174, 5, safe_iconv("ESPACIOS Y EQUIPAMIENTOS"), 1, 0, "C", true);
$pdf->Ln();

$widths = [29, 29, 29, 29, 29, 29];
$pdf->SetFont("Nutmeg", "", 8);

$texts = [
    "INSTALACIONES",
    "CAPACIDAD\nPROMEDIO\n(No. DE\nALUMNOS)",
    "METROS",
    "RECURSOS\nMATERIALES",
    "UBICACIÓN",
    "ASIGNATURAS\nQUE ATIENDE"
];

$pdf->SetFillColor(255, 213, 176);
$pdf->ExpandHeaderRow($pdf, $texts, $widths);

$aulasIds = [1, 2, 3, 14];
$labsIds = [4, 5, 6, 7, 11, 12, 13];
$computoIds = [8];
$bibliotecaIds = [9, 10];

function mostrarInfraestructuraPorTipo($pdf, $infraestructuras, $titulo, $tipoIds)
{
    $pdf->SetFillColor(255, 213, 176);
    $pdf->Cell(174, 5, iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $titulo), 1, 0, "C", true);
    $pdf->Ln();

    $pdf->SetColors([[255, 255, 255], [255, 255, 255]]);
    $pdf->SetWidths([29, 29, 29, 29, 29, 29]);
    $pdf->SetAligns(['C', 'C', 'C', 'L', 'C', 'C']);
    $pdf->SetLineHeight(4);

    $filtradas = array_filter($infraestructuras, function ($inf) use ($tipoIds) {
        return in_array($inf['tipoInstalacionId'], $tipoIds);
    });

    foreach ($filtradas as $infra) {
        $asignaturas = array_column($infra['asignaturasInfraestructura'] ?? [], 'asignatura');
        $clavesAsignaturas = array_filter(array_map(function ($asig) {
            return $asig['clave'] ?? '';
        }, $asignaturas));
        $asignaturasTexto = implode("\n", $clavesAsignaturas);

        $pdf->RowBlanco([
            iconv('UTF-8', 'ISO-8859-1//TRANSLIT', mb_strtoupper($infra['nombre']) ?? ''),
            iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $infra['capacidad'] ?? ''),
            iconv('UTF-8', 'ISO-8859-1//TRANSLIT', mb_strtoupper($infra['metros']) . " m²"),
            iconv('UTF-8', 'ISO-8859-1//TRANSLIT', mb_strtoupper($infra['recursos']) ?? ''),
            iconv('UTF-8', 'ISO-8859-1//TRANSLIT', mb_strtoupper($infra['ubicacion']) ?? ''),
            iconv('UTF-8', 'ISO-8859-1//TRANSLIT', mb_strtoupper($asignaturasTexto) ?? '')
        ]);
    }
}

mostrarInfraestructuraPorTipo($pdf, $infraestructuras, "AULAS", $aulasIds);
mostrarInfraestructuraPorTipo($pdf, $infraestructuras, "LABORATORIOS Y TALLERES", $labsIds);
mostrarInfraestructuraPorTipo($pdf, $infraestructuras, "LABORATORIO DE CÓMPUTO", $computoIds);
mostrarInfraestructuraPorTipo($pdf, $infraestructuras, "BIBLIOTECA FÍSICA Y VIRTUAL", $bibliotecaIds);

$pdf->Ln(5);

// Seccion de Relacion de Instituciones (6)
$pdf->SetFont("Nutmegb", "", 9);
$pdf->SetFillColor(255, 161, 61);
$pdf->ExpandHeaderRow($pdf, [
    "6. RELACIÓN DE INSTITUCIONES DE SALUD ALEDAÑAS, SERVICIOS DE\nAMBULANCIA U OTROS SERVICIOS DE EMERGENCIA A LOS CUALES RECURRIRÁ\nLA INSTITUCIÓN EN CASO DE ALGUNA CONTINGENCIA",
], [174]);
$pdf->SetFillColor(255, 213, 176);
$pdf->SetFont("Nutmeg", "", 9);
$widths = [87, 87];

$texts = [
    "NOMBRE DE LA INSTITUCIÓN",
    "TIEMPO APROXIMADO REQUERIDO\nPARA LLEGAR A LA ESCUELA (EN MINUTOS)",
];

$pdf->SetFillColor(255, 213, 176);
$pdf->ExpandHeaderRow($pdf, $texts, $widths);

$pdf->SetFillColor(255, 255, 255);
$pdf->SetAligns(["L", "C"]);
$pdf->SetWidths([87, 87]);
foreach ($saludInstituciones as $institucion) {
    $nombre = $institucion['nombre'] ?? '';
    $tiempo = $institucion['tiempo'] ?? '';

    $partes = explode(':', $tiempo);
    $horas = (int) ($partes[0] ?? 0);
    $minutos = (int) ($partes[1] ?? 0);

    if ($horas > 0 && $minutos > 0) {
        $tiempoTexto = "{$horas} h {$minutos} min";
    } elseif ($horas > 0) {
        $tiempoTexto = "{$horas} h";
    } elseif ($minutos > 0) {
        $tiempoTexto = "{$minutos} min";
    } else {
        $tiempoTexto = "0 min";
    }

    $pdf->RowBlanco([
        safe_iconv($nombre),
        safe_iconv($tiempoTexto)
    ]);
}

if ($pdf->checkNewPage()) {
    $pdf->Ln(20);
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
$pdf->Output('I', 'FDA04.pdf');
