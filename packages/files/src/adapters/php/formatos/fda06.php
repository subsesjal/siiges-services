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
$plantel = $programa['plantel'] ?? [];
$institucion = $plantel['institucion'] ?? [];
$nivel = $programa['nivel'] ?? [];
$modalidad = $programa['modalidad'] ?? [];
$ciclo = $programa['ciclo'] ?? [];
$domicilioPlantel = $plantel['domicilio'] ?? [];

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
$pdf->Cell(0, 5, safe_iconv("OBLIGACIONES ADQUIRIDAS AL OBTENER UN RVOE"), 0, 1, "L");
$pdf->SetTextColor(0, 0, 0);
$pdf->Ln(5);

$pdf->SetFont("Nutmeg", "", 9);
$fechaRaw = $solicitud["fecha"] ?? date("Y-m-d");
$fechaFormateada = date("d/m/Y", strtotime($fechaRaw));
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper($fechaFormateada)), 0, 1, "R");
$pdf->Ln(5);

if ("Masculino" == $usuario["persona"]["sexo"]) {
    $prefijo = "El";
} else {
    $prefijo = "La";
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
    "$prefijo C. $usuarioNombre de $institucionNombre declara, bajo protesta de decir verdad, que los datos proporcionados en la solicitud $folio cuentan con un inmueble con las condiciones de seguridad, higiénicas necesarias para impartir el plan de estudios para el programa " .
    ($cicloTxt[$tipo] ?? '') . " $programaNombre modalidad " . ($modalidadTxt[$modalidad] ?? '') . " en períodos " . ($ciclos[$ciclo] ?? '') .
    ", asimismo ACEPTA cumplir y se compromete con las siguientes obligaciones derivadas del otorgamiento del Reconocimiento de Validez Oficial de Estudios."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "1.- Cumplir con lo dispuesto en la Constitución Política de los Estados Unidos Mexicanos en el artículo 3°, la Ley General de Educación, la Ley General de Educación Superior, la Ley de Educación del Estado Libre y Soberano de Jalisco, la Ley de Educación Superior del Estado de Jalisco y demás disposiciones legales y administrativas que le sean aplicables."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "2.- Mencionar, en toda su documentación y publicidad que expida, la fecha y número del acuerdo por el cual se otorgó el Reconocimiento de Validez Oficial de Estudios, la autoridad que lo expidió y el periodo establecido."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "3.- Respetar los lineamientos descritos en el RVOE que establecen los lineamientos legales para la comercialización de los servicios educativos que prestan los particulares."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "4.- Ceñirse a los planes y programas autorizados por la Autoridad Educativa y a los tiempos aprobados para su aplicación."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "5.- Los planes y programas de estudio validados por la Autoridad Educativa, una vez que son aprobados no podrán modificarse hasta su vencimiento, de lo contrario no tendrá validez para cualquier trámite ante cualquier autoridad competente."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "6.- La Institución se compromete a mantener actualizados los planes y programas de estudio de acuerdo a los avances de la materia y someterlos a refrendo al término del periodo establecido por la Autoridad Educativa."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "7.- Reportar a la Autoridad Educativa, cualquier daño o modificación que sufra el inmueble en su estructura, con posterioridad a la fecha de presentación de la solicitud de autorización del Reconocimiento de Validez Oficial de Estudios, proporcionando, en su caso, los datos de la nueva constancia en la que se acredite que las reparaciones o modificaciones cumplen con las normas de construcción y seguridad."
), 0, "J");

$pdf->AddPage("P", "Letter");
$pdf->Ln(20);

$pdf->MultiCell(0, 5, safe_iconv(
    "8.- Facilitar y colaborar en las actividades de evaluación, inspección y vigilancia que las autoridades competentes realicen u ordenen, como lo establece la Ley General de Educación en su artículo 149 fracción V."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "9.- Conservar en el domicilio en el que se autorizó el RVOE, todos los documentos administrativos y de control escolar que se generen, de manera física de conformidad a la Ley General de Educación en su artículo 151."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "11.- Constituir el Comité de Seguridad Escolar, de conformidad con los lineamientos establecidos en el Diario Oficial de la Federación del 4 de septiembre de 1986."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "12.- La SICyT verificará las instalaciones para que cumplan con la normatividad vigente, higiene seguridad y pedagogía."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "13.- Cumplir con el perfil de personal docente, tanto de nuevo ingreso como los propuestos a una asignatura diferente. Cualquier modificación deberá presentarse a la Autoridad Educativa para su autorización."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "14.- Contar con el acervo bibliográfico y los recursos didácticos requeridos para el desarrollo del plan de estudios y sus respectivos programas."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "15.- Proporcionar un mínimo de becas del 5% del total de población estudiantil, establecidas en la Ley y los lineamientos en la materia. Generar documentación que lo acredite y tenerla en físico por si la SICyT lo solicita en la visita de vigilancia."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "16.- Pagar anualmente la matrícula de alumnos por cada RVOE otorgado y alumno activo en cada ejercicio escolar, acatando los requisitos y tiempos establecidos en la convocatoria correspondiente."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "17.- Dar el seguimiento académico y reportar a la Dirección de Servicios Escolares los avances académicos de los alumnos a partir de su inscripción, acreditación, regularización, reinscripción, certificación y titulación."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "18.- Una vez recibido el Acuerdo de Incorporación, el particular deberá realizar los registros ante las autoridades correspondientes trámites para la asignación de la clave de centro de trabajo ante la Secretaría de Educación Jalisco, su registro ante la Dirección de Profesiones del Estado de Jalisco y la Dirección General de Profesiones de la Secretaría de Educación Pública y aquellos que correspondan."
), 0, "J");

$pdf->Ln(5);

$pdf->MultiCell(0, 5, safe_iconv(
    "19.-Es obligación de la Institución Educativa, que la documentación que presenta sea auténtica."
), 0, "J");

$pdf->AddPage("P", "Letter");
$pdf->Ln(20);

$pdf->MultiCell(0, 5, safe_iconv(
    "20.- Emitir sus propios reglamentos internos, solicitar la autorización a la Secretaría de Innovación Ciencia y Tecnología; una vez autorizados, los dará a conocer antes del trámite de inscripción o reinscripción. Deberá conservar evidencia a fin de que la Autoridad Educativa verifique el cumplimiento de esta obligación."
), 0, "J");

$pdf->Ln(25);
$pdf->SetFont("Nutmeg", "", 11);
$pdf->Cell(0, 5, safe_iconv("BAJO PROTESTA DE DECIR VERDAD"), 0, 1, "C");
$pdf->SetFont("Nutmegb", "", 11);
$pdf->Cell(0, 5, safe_iconv(mb_strtoupper(trim(
    ($usuario["persona"]['nombre'] ?? '') . ' ' .
    ($usuario["persona"]['apellidoPaterno'] ?? '') . ' ' .
    ($usuario["persona"]['apellidoMaterno'] ?? '')
) ?? "")), 0, 1, "C");

$pdf->Output("I", "FDA02.pdf");
