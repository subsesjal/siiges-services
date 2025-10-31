<?php
//call main fpdf file
require('fpdf.php');

//create new class extending fpdf class
class PDF_MC_Table extends FPDF
{

  // variable to store widths and aligns of cells, and line height
  var $widths;
  var $aligns;
  var $lineHeight;
  var $colors;

  //Set the array of column widths
  function SetWidths($w)
  {
    $this->widths = $w;
  }

  // Alias para compatibilidad con código actua
  function SetColWidths($w)
  {
    $this->SetWidths($w);
  }

  //Set the array of column alignments
  function SetAligns($a)
  {
    $this->aligns = $a;
  }

  //Set the array of column alignments
  function SetColors($cl)
  {
    $this->colors = $cl;
  }

  //Set line height
  function SetLineHeight($h)
  {
    $this->lineHeight = $h;
  }

  //Calculate the height of the row
  function Row($data)
  {
    // number of line
    $nb = 0;

    // loop each data to find out greatest line number in a row.
    for ($i = 0; $i < count($data); $i++) {
      // NbLines will calculate how many lines needed to display text wrapped in specified width.
      // then max function will compare the result with current $nb. Returning the greatest one. And reassign the $nb.
      $nb = max($nb, $this->NbLines($this->widths[$i], $data[$i]));
    }

    //multiply number of line with line height. This will be the height of current row
    $h = $this->lineHeight * $nb;

    //Issue a page break first if needed
    $this->CheckPageBreak($h);

    //Draw the cells of current row
    for ($i = 0; $i < count($data); $i++) {
      // width of the current col
      $w = $this->widths[$i];
      // alignment of the current col. if unset, make it left.
      $a = isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
      //Save the current position
      $x = $this->GetX();
      $y = $this->GetY();

      $arrayColor = (isset($this->colors[$i]) && !empty($this->colors[$i])) ? $this->colors[$i] : [255, 255, 255];
      $r = $arrayColor[0];
      $g = $arrayColor[1];
      $b = $arrayColor[2];

      $this->SetFillColor($r, $g, $b);
      //Draw the border
      $this->Rect($x, $y, $w, $h, 'FD');

      //Print the text
      $this->MultiCell($w, 5, $data[$i], 0, $a);
      //Put the position to the right of the cell
      $this->SetXY($x + $w, $y);
    }
    //Go to the next line
    $this->Ln($h);
  }

  function RowBlanco($data)
  {
    $nb = 0;
    for ($i = 0; $i < count($data); $i++) {
      $nb = max($nb, $this->NbLines($this->widths[$i], $data[$i]));
    }
    $h = $this->lineHeight * $nb;

    if ($this->CheckPageBreak($h + 25)) {
      $this->Ln(25);
    }

    for ($i = 0; $i < count($data); $i++) {
      $w = $this->widths[$i];
      $a = isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
      $x = $this->GetX();
      $y = $this->GetY();

      $arrayColor = (isset($this->colors[$i]) && !empty($this->colors[$i]))
        ? $this->colors[$i]
        : [255, 255, 255];
      $r = $arrayColor[0];
      $g = $arrayColor[1];
      $b = $arrayColor[2];

      $this->SetFillColor($r, $g, $b);
      $this->Rect($x, $y, $w, $h, 'FD');

      $lines = $this->NbLines($w, $data[$i]);
      $cellHeight = $this->lineHeight * $lines;
      $verticalOffset = ($h - $cellHeight) / 2;
      $this->SetXY($x, $y + $verticalOffset);

      $this->MultiCell($w, $this->lineHeight, $data[$i], 0, $a);
      $this->SetXY($x + $w, $y);
    }
    $this->Ln($h);
  }

  function CheckPageBreak($h)
  {
    $margenInferior = 20;
    if ($this->GetY() + $h > ($this->h - $margenInferior)) {
      $this->AddPage("P", "Letter");
      return true;
    }
    return false;
  }
  function RowBlancoLandscape($data)
  {
    $nb = 0;
    for ($i = 0; $i < count($data); $i++) {
      $nb = max($nb, $this->NbLines($this->widths[$i], $data[$i]));
    }
    $h = $this->lineHeight * $nb;

    if ($this->CheckPageBreakLandscape($h + 25)) {
      $this->Ln(5);
    }

    for ($i = 0; $i < count($data); $i++) {
      $w = $this->widths[$i];
      $a = isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
      $x = $this->GetX();
      $y = $this->GetY();

      $arrayColor = (isset($this->colors[$i]) && !empty($this->colors[$i]))
        ? $this->colors[$i]
        : [255, 255, 255];
      $r = $arrayColor[0];
      $g = $arrayColor[1];
      $b = $arrayColor[2];

      $this->SetFillColor($r, $g, $b);
      $this->Rect($x, $y, $w, $h, 'FD');

      $lines = $this->NbLines($w, $data[$i]);
      $cellHeight = $this->lineHeight * $lines;
      $verticalOffset = ($h - $cellHeight) / 2;
      $this->SetXY($x, $y + $verticalOffset);

      $this->MultiCell($w, $this->lineHeight, $data[$i], 0, $a);
      $this->SetXY($x + $w, $y);
    }
    $this->Ln($h);
  }

  function CheckPageBreakLandscape($h)
  {
    $margenInferior = 20;
    if ($this->GetY() + $h > ($this->h - $margenInferior)) {
      $this->AddPage("L", "Letter");
      return true;
    }
    return false;
  }

  function NbLines($w, $txt)
  {
    //calculate the number of lines a MultiCell of width w will take
    $cw = &$this->CurrentFont['cw'];
    if ($w == 0)
      $w = $this->w - $this->rMargin - $this->x;
    $wmax = ($w - 2 * $this->cMargin) * 1000 / $this->FontSize;
    $s = str_replace("\r", '', $txt);
    $nb = strlen($s);
    if ($nb > 0 and $s[$nb - 1] == "\n")
      $nb--;
    $sep = -1;
    $i = 0;
    $j = 0;
    $l = 0;
    $nl = 1;
    while ($i < $nb) {
      $c = $s[$i];
      if ($c == "\n") {
        $i++;
        $sep = -1;
        $j = $i;
        $l = 0;
        $nl++;
        continue;
      }
      if ($c == ' ')
        $sep = $i;
      $l += $cw[$c];
      if ($l > $wmax) {
        if ($sep == -1) {
          if ($i == $j)
            $i++;
        } else
          $i = $sep + 1;
        $sep = -1;
        $j = $i;
        $l = 0;
        $nl++;
      } else
        $i++;
    }
    return $nl;
  }
}
