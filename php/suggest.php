<?php

$bEnableAPC = false; // disable APC cache global

// Cleanup GET Variable to prevent Xsite Scripting
$locales = filter_input(INPUT_GET,'locales',FILTER_SANITIZE_STRING);
$term =  filter_input(INPUT_GET,'term',FILTER_SANITIZE_STRING);

// index use for APC Cache
$sApcIdx = 'yps_suggest_'.$locales.'_'.$term;
if($bEnableAPC) {
    if(function_exists('apc_fetch')) {   // Read from APC Cache if enabled
        $success = false;    
        $res = apc_fetch($sApcIdx,$success);
        if($success === true) {        
            echo $res;
            exit;
        }
    }
}

// Get JSON Results from Ypsilon.NET GEO Database
$res = file_get_contents('http://fl-daniel.dev.ypsilon.net/suggest.php?is_airport=1&filterGeoRailway=1&locales='.$locales.'&term='.$term);
echo $res;

flush();
if($bEnableAPC) { // Store into APC Cache if Enabled
    if(function_exists('apc_store')) {
        apc_store($sApcIdx,$res,3600);
    }
}

?>
