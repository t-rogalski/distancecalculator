<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function haversine($lat1, $lon1, $lat2, $lon2) {
    $earth_radius = 6371000;

    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a = sin($dLat/2) * sin($dLat/2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon/2) * sin($dLon/2);

    $c = 2 * atan2(sqrt($a), sqrt(1-$a));
    return $earth_radius * $c;
}

$input = json_decode(file_get_contents("php://input"), true);
$distance = haversine($input['lat1'], $input['lon1'], $input['lat2'], $input['lon2']);

echo json_encode([
    "meters" => $distance,
    "kilometers" => $distance / 1000,
    "lat1" => $input['lat1'],
    "lon1" => $input['lon1'],
    "lat2" => $input['lat2'],
    "lon2" => $input['lon2']
]);