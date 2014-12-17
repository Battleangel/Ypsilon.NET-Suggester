<?php

$bEnableAPC = true;
$locales = filter_input(INPUT_GET,'locales',FILTER_SANITIZE_STRING);
//$locales = $_REQUEST['locales'];
$term =  filter_input(INPUT_GET,'term',FILTER_SANITIZE_STRING);

$sApcIdx = 'yps_suggest_'.$locales.'_'.$term;
if($bEnableAPC) {
    if(function_exists('apc_fetch')) {     
        $success = false;    
        $ret[0] = apc_fetch($sApcIdx,$success);
        if($success === true) {        
            echo $ret[0];
            exit;
        }
    }
}

$res = file_get_contents('http://flweb.ypsilon.net/suggest.php?filterGeoRailway=1&locales='.$locales.'&term='.$term);
echo $res;

flush();
if($bEnableAPC) {
    if(function_exists('apc_store')) {
        apc_store($sApcIdx,$res,3600);
    }
}

?>
