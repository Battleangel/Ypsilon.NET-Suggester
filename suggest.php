<?php
$res = file('http://flweb.ypsilon.net/suggest.php?filterGeoRailway=1&locales='.urlencode($_REQUEST['locales']).'&getGeoByLetter='.urlencode($_REQUEST['getGeoByLetter']).'&letters='.urlencode($_REQUEST['letters']));
echo utf8_encode(implode("",$res));
?> 
