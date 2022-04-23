 <?php
 $ip = ($_SERVER["HTTP_VIA"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
$ip = ($ip) ? $ip : $_SERVER["REMOTE_ADDR"];
$txt=$_POST["txt"];
file_put_contents("url.txt", date( 'Y-m-d H:i:s' ). "\t". "$ip"."\t".$txt .PHP_EOL, FILE_APPEND | LOCK_EX);
?>