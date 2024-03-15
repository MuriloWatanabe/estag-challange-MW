<?php
include '../index.php';

function postCategory($name, $tax){
$categoryPost = myPDO->prepare("INSERT INTO categories (name, tax ) VALUES ( :name, :tax )");
$categoryPost->bindParam(":name", $name);
$categoryPost->bindParam(":tax", $tax);
$categoryPost->execute();
return 'categoria criada';
}

function getCategories(){
    $category = myPDO -> query("SELECT * FROM categories");
    $data = $category -> fetchALL();
    return print_r(json_encode($data));
}
function delCategory(){
    $del = myPDO->prepare("DELETE FROM CATEGORIES WHERE code=".$_REQUEST["code"]);
    $del->execute();
    return 'categoria deletada';

}