<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx8166622f224dfbc7", "58e2f5a3db7941ca86801ed0f81b7ebc");
$signPackage = $jssdk->GetSignPackage();

echo json_encode(array(
  "appId" =>$signPackage["appId"],
  "timestamp" =>$signPackage["timestamp"],
  "nonceStr" =>$signPackage["nonceStr"],
  "signature" =>$signPackage["signature"],
  "url" =>$signPackage["url"]
  ));
  
?>