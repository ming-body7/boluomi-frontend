<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxa81810d5be83a1da", "5f7a3196ad2aaf421ce5b0de9195a3cd");
$signPackage = $jssdk->GetSignPackage();

echo json_encode(array(
  "appId" =>$signPackage["appId"],
  "timestamp" =>$signPackage["timestamp"],
  "nonceStr" =>$signPackage["nonceStr"],
  "signature" =>$signPackage["signature"],
  "url" =>$signPackage["url"]
  ));
  
?>