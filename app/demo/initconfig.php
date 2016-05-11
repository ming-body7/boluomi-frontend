<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxce5103688fc8d7e0", "1117e5e697bcfafadc1b91d726ed33b6");
$signPackage = $jssdk->GetSignPackage();

echo json_encode(array(
  "appId" =>$signPackage["appId"],
  "timestamp" =>$signPackage["timestamp"],
  "nonceStr" =>$signPackage["nonceStr"],
  "signature" =>$signPackage["signature"],
  "url" =>$signPackage["url"]
  ));
  
?>