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
$fechaSurteEfecto = $programa['fechaSurteEfecto'] ?? '';
$vigencia = $programa['vigencia'] ?? '';
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];
$nivel = $programa['nivel'] ?? [];
$modalidadId = (int) $programa['modalidadId'] ?? 0;
$modalidadesMap = [
    1 => "Escolarizada",
    2 => "No escolarizada",
    3 => "Mixta",
    4 => "Dual"
];
$cicloId = (int) ($programa['cicloId'] ?? 0);
$modalidadNombre = $modalidadesMap[$modalidadId] ?? "NO ESPECIFICADO";
$cicloNombres = [
    1 => "Semestrales",
    2 => "Cuatrimestrales",
    3 => "Anuales",
    4 => "Semestrales curriculum flexible",
    5 => "Cuatrimestrales curriculum flexible"
];
$cicloNombre = $cicloNombres[$cicloId] ?? "NO ESPECIFICADO";
$domicilioPlantel = $plantel['domicilio'] ?? [];
$nombrePrograma = $programa['nombre'] ?? '';
$colonia = $domicilioPlantel['colonia'] ?? '';
$codigoPostal = $domicilioPlantel['codigoPostal'] ?? '';
$municipio = $domicilioPlantel['municipio'] ?? '';
$nombreMunicipio = $municipio['nombre'] ?? '';
$estado = $domicilioPlantel['estado'] ?? '';
$nombreEstado = $estado['nombre'] ?? '';
$razonSocial = $institucion['razonSocial'] ?? '';
$programaTurnos = $programa['programaTurnos'] ?? [];
$TURNOS_MAP = [
  1 => "Matutino",
  2 => "Vespertino",
  3 => "Nocturno",
  4 => "Mixto"
];
$turnosNombres = [];
foreach ($programaTurnos as $pt) {
  $tid = (int) ($pt['turnoId'] ?? 0);
  if (isset($TURNOS_MAP[$tid])) {
    $turnosNombres[] = $TURNOS_MAP[$tid];
  }
}
$turnosTexto = implode(", ", $turnosNombres);

$duracionPeriodos = (int) ($programa['duracionPeriodos'] ?? 0);
$mesesPorCicloMap = [
    1 => 6,
    2 => 4,
    3 => 12,
    4 => 6,
    5 => 4,
];

$cicloId = (int) ($programa['cicloId'] ?? ($ciclo['id'] ?? 1));
$mesesPorCiclo = $mesesPorCicloMap[$cicloId] ?? 6;

$duracionTotalMeses = $mesesPorCiclo * $duracionPeriodos;
$duracionTotalAnos  = (int) round($duracionTotalMeses / 12);

$formatearDuracion = function (int $anios): string {
    return $anios . ' año' . ($anios !== 1 ? 's' : '');
};

$duracionTexto = $formatearDuracion($duracionTotalAnos);
$numeroExterior = $domicilioPlantel['numeroExterior'] ?? '';
$numeroInterior = $domicilioPlantel['numeroInterior'] ?? '';
$numeroCompleto = $numeroExterior;
if (!empty($numeroInterior)) {
    $numeroCompleto .= " " . $numeroInterior;
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage("P", "Letter");
$pdf->SetMargins(20, 20, 20);

$pdf->SetFont("Nutmegb", "", 11);
$pdf->Ln(25);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFillColor(115, 199, 209);
$pdf->Cell(140, 5, "", 0, 0, "L");
$pdf->Cell(35, 6, "FDA06", 0, 0, "R", true);
$pdf->Ln(10);

$pdf->SetTextColor(115, 199, 209);
$pdf->Cell(0, 5, safe_iconv("ACUERDO DE RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS (RVOE)"), 0, 1, "L");
$pdf->SetTextColor(0, 0, 0);
$pdf->Ln(5);

$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? date("Y-m-d");
$fechaFormateadaSurte = date("d/m/Y", strtotime($fechaSurteEfecto));
$fechaFormateadaVigencia = date("d/m/Y", strtotime($vigencia));
$fechaFormateada = date("d/m/Y", strtotime($fechaRaw));
$pdf->Ln(5);

if ("Masculino" == $usuario["persona"]["sexo"]) {
    $prefijo = "el";
} else {
    $prefijo = "la";
}

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
    "Se expide el presente Acuerdo con fundamento en la Constitución Política de los Estados Unidos Mexicanos en su artículo 3 fracción VI; Ley General de Educación en sus artículos 146, 147, 148 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168,169, 170,171, 172, 173, 174, 175, 176, 177, 178 y 179; Ley General de Educación Superior en sus artículos 5, 8, 10, 14, 18, 22 fracción VIII, 36, 37, 39, 49, 56, 68, 69, 70, 71,72, 73, 74, 75 y 76; Ley de Educación del Estado Libre y Soberano de Jalisco en sus artículos 32, 45, 83, 85, 112, 116 fracciones I y VII, 136, 141,142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152 y 153; Ley de Educación Superior del Estado de Jalisco en sus artículos 72, 73, 74, 75, 76 y 77. Reglamento para la Obtención De Reconocimiento De Validez Oficial De Estudios en materia de incorporación de instituciones particulares para el tipo superior en sus artículos 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 y 30."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "C O N S I D E R A N D O :"
), 0, "C");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "ÚNICO.- Que a la $institucionNombre a través de su representante legal $prefijo C. $usuarioNombre, con fecha del $fechaFormateada presentó ante la Secretaría de Innovación, Ciencia y Tecnología, la solicitud para obtener el RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS, cumpliendo con la totalidad de documentos administrativos y pedagógicos, así como de las etapas previstas en la Ley de Educación Superior del Estado de Jalisco y en el Instructivo para la obtención del Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "C L Á U S U L A S"
), 0, "C");

$pdf->Ln(5);

$acuerdoRvoe = $programa["acuerdoRvoe"] ?? "";

$pdf->MultiCell(0, 5, safe_iconv(
    "PRIMERA.- Se otorga el Acuerdo $acuerdoRvoe a la $razonSocial representada legalmente por $prefijo C. $usuarioNombre, para ofertar e impartir el plan y programas de estudio de $nombrePrograma, en el turno $turnosTexto, periodos $cicloNombre, modalidad $modalidadNombre, con una duración de $duracionTexto, número $numeroCompleto, en la colonia $colonia, código postal $codigoPostal, en el municipio de $nombreMunicipio, $nombreEstado."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "SEGUNDA.- Que la presente $institucionNombre, a través de su representante legal, queda obligada a cumplir con lo dispuesto en las Leyes enunciadas anteriormente, además del Instructivo para la obtención del Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco y demás disposiciones y lineamientos que emita la Secretaría de Innovación, Ciencia y Tecnología en la materia y se sujeta a los procesos de supervisión y vigilancia que emitan las Leyes y esta Autoridad."
), 0, "J");

$pdf->AddPage("P", "Letter");
$pdf->Ln(20);

$pdf->MultiCell(0, 5, safe_iconv(
    "TERCERA.- Conforme a las características de , establecidas en la primera cláusula de este acuerdo, se obliga a la presente $institucionNombre, a crear/renovar su reglamento interno, haciendo las adecuaciones pertinentes para que el alumnado sea conocedor de sus derechos y obligaciones. Esta creación/renovación deberá presentarse en un plazo máximo de 30 días hábiles posteriores a la entrega del RVOE."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "CUARTA.- El presente Acuerdo de Reconocimiento de Validez Oficial de Estudios es para efectos eminentemente educativos, por lo que la presente $institucionNombre, queda obligada a obtener de las autoridades competentes todos los permisos, dictámenes y licencias que procedan conforme a los ordenamientos aplicables y sus disposiciones reglamentarias."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "QUINTA.- El Reconocimiento de Validez Oficial de Estudios que ampara el presente Acuerdo aquí autorizado $acuerdoRvoe, surtirá sus efectos a partir del $fechaFormateadaSurte. El Acuerdo no es transferible y su vigencia será de $fechaFormateadaVigencia, contados a partir de que surta efectos. A su vencimiento, deberá realizarse el trámite de refrendo de dicho plan y programas de estudio. Por lo anterior se instaura como fecha de vencimiento el día $fechaFormateadaVigencia."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "Cualquier acuerdo posterior a éste que modifique el número de RVOE, como lo es el cambio de domicilio o la modificación de nombre institucional, NO interrumpirá ni generará una nueva vigencia para el acuerdo presente."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "Se aclara que el actual acuerdo de RVOE continuará vigente en tanto no concluya la última generación de alumnos ya inscritos en dicho plan, a la fecha de entrada en vigor de este acuerdo y posterior a ello quedará sin efectos."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "SEXTA.- En caso de que la presente $institucionNombre, a través de su representante legal, desee suspender definitivamente la prestación del servicio educativo, se obliga a dar aviso por escrito a la Secretaría de Innovación, Ciencia y Tecnología, con anticipación de por lo menos sesenta días naturales previstos a la fecha de cierre de actividades académicas, comprometiéndose además, a entregar los archivos correspondientes y no dejar alumnos inscritos con ciclos inconclusos, ni obligaciones pendientes por cumplir. Para el cumplimiento de estas obligaciones, deberán apegarse tanto al marco jurídico vigente."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "SÉPTIMA.- Que el incumplimiento a cualquiera de las obligaciones derivadas de las Leyes, Reglamentos, Políticas y Lineamientos del presente Acuerdo y las demás aplicables, será motivo para las sanciones a que diera lugar."
), 0, "J");

$pdf->AddPage("P", "Letter");
$pdf->Ln(20);

$pdf->MultiCell(0, 5, safe_iconv(
    "OCTAVA.- Una vez otorgado el Reconocimiento de Validez Oficial de Estudio, por parte de esta Autoridad, se obliga al particular a notificar a las autoridades competentes para cualquier fin correspondiente."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "Expedido en la ciudad de Guadalajara, Jalisco, el $fechaFormateada."
), 0, "C");

$pdf->Ln(5);

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv("MTRA. FANNY GUADALUPE VALDIVIA MÁRQUEZ"), 0, 1, "C");
$pdf->SetFont("Nutmegb", "", 11);
$pdf->Cell(0, 5, safe_iconv("Subsecretaria de Educación Superior"), 0, 1, "C");

$pdf->Output("I", "FDA02.pdf");
