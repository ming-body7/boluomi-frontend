<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx5f3da72d8d544e53", "e0b205a060ff804ef5f85a95f11f5a5a");
$signPackage = $jssdk->GetSignPackage();

echo json_encode(array(
  "appId" =>$signPackage["appId"],
  "timestamp" =>$signPackage["timestamp"],
  "nonceStr" =>$signPackage["nonceStr"],
  "signature" =>$signPackage["signature"],
  "url" =>$signPackage["url"]
  ));
  
?>