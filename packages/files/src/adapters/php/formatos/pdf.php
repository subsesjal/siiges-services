<?php
require(realpath(__DIR__ . "/../fpdf181/pdf_mc_table.php"));

class PDF extends PDF_MC_Table
{
  // Cabecera de p�gina
  function Header()
  {
    $this->Image(realpath(__DIR__ ."/../images/encabezado.png"), 60, 15, 75);
    $this->AddFont('Nutmeg', '', 'Nutmeg-Regular.php');
    $this->AddFont('Nutmegb', '', 'Nutmeg-Bold.php');
    $this->AddFont('Nutmegbk', '', 'Nutmeg-Book.php');
  }

  // Pie de p�gina
  function Footer()
  {
    $this->SetY(-30);
    $this->SetFont("Nutmegbk", "", 7);
    $this->SetTextColor(0, 0, 0);
    $this->Ln(5);
    $this->Image(realpath(__DIR__ . "/../images/direccion_nueva_sicyt.png"), 60, 250, 60);
    $this->SetY(-20);
    $this->SetTextColor(191, 191, 191);
    $this->Cell(0, 5, iconv('UTF-8', 'ISO-8859-1//TRANSLIT', "Página " . $this->PageNo()), 0, 0, "R");
  }

  function vcell($c_width, $c_height, $x_axis, $text, $length)
  {
    // var_dump($text);
    /*echo "<br>";
      echo $text;
      echo $length;
      echo "<br>";*/
    $w_text = str_split($text, $length);
    $c_height = $c_height > sizeof($w_text) * 5 ? $c_height : sizeof($w_text) * 5;
    $w_w = sizeof($w_text);
    $len = strlen($text);
    if ($len > $length) {
      $w_w_1 = $w_w + 4;
      foreach ($w_text as $key => $value) {
        $this->SetX($x_axis);
        $this->Cell($c_width, $w_w_1, iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $value), '', '', 'L');
        if ($w_w > 4) {
          $w_w_1 += 7;
        } else {
          $w_w_1 += $w_w + 5;
        }
      }
      $this->SetX($x_axis);
      $this->Cell($c_width, $c_height, '', 'LTRB', 0, 'L', 0);
    } else {
      $this->SetX($x_axis);
      $this->Cell($c_width, $c_height, iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $text), 'LTRB', 0, 'L', 0);
    }
    return $c_height;
  }

  function Tabla($header, $datos, $width = 0, $height = 0, $length = 15, $sHeaders = true)
  {
    $c_width = $width;
    $c_height = $height;
    $this->SetLineWidth(.3);
    $this->SetFont('Arial', 'B', 9);
    //Cabecera
    if ($sHeaders) {
      foreach ($header as $key => $value) {
        // $x_axis=$this->getx();
        // $c_height = $this->vcell($c_width[$key],$c_height,$x_axis,$value,$length[$key]);
        $this->Cell($c_width[$key], 5, iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $value), 1, 0, 'C', true);
      }
      $this->Ln();
    }

    $this->SetFont('Arial', '', 7);
    //print_r($datos);
    if (is_array($datos) || is_object($datos)) {
      foreach ($datos as $registro) {
        $registro = (array) $registro;
        foreach ($header as $key => $value) {
          if ($this->checkNewPage()) {
            $this->Ln(25);
          }

          $x_axis = $this->getx();
          $c_height = $this->vcell($c_width[$key], $c_height, $x_axis, $registro[$key], $length[$key]);
        }

        $this->Ln();
      }
    }
    // exit();
  }
  function checkNewPage()
  {
    if ($this->GetY() > 230) {
      $this->AliasNbPages();
      $this->AddPage("P", "Letter");
      return true;
    }
  }

  // M�todo para orden ascendente o descendente
  public static function array_sort($array, $on, $order = SORT_ASC)
  {
    $new_array = array();
    $sortable_array = array();

    if (count($array) > 0) {
      foreach ($array as $k => $v) {
        if (is_array($v)) {
          foreach ($v as $k2 => $v2) {
            if ($k2 == $on) {
              $sortable_array[$k] = $v2;
            }
          }
        } else {
          $sortable_array[$k] = $v;
        }
      }

      switch ($order) {
        case SORT_ASC:
          asort($sortable_array);
          break;
        case SORT_DESC:
          arsort($sortable_array);
          break;
      }

      foreach ($sortable_array as $k => $v) {
        $new_array[$k] = $array[$k];
      }
    }

    return $new_array;
  }

  public static function convertirFecha($fecha)
  {
    if ($fecha) {
      $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
      return date('d', strtotime($fecha)) . " de " . $meses[date('n', strtotime($fecha)) - 1] . " del " . date('Y');
    }
  }
}
