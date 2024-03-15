<?php
 include_once "../index.php";


 function postProduct($name , $amount, $price , $category_code){
    $productPost = myPDO->prepare("INSERT INTO products (name,amount, price,category_code ) VALUES (:name, :amount , :price , :category_code )");
    $productPost ->bindParam(":name", $name);
    $productPost ->bindParam(":amount", $amount);
    $productPost ->bindParam(":price", $price);
    $productPost ->bindParam(":category_code", $category_code);
    $productPost->execute();
    return 'product criado';
    }

    
function getCategories(){
    $category = myPDO -> query("SELECT * FROM categories");
    $data = $category -> fetchALL();
    return print_r(json_encode($data));
};
function getProducts(){
    $product = myPDO -> query("SELECT * FROM products INNER JOIN categories ON products.category_code = categories.code");
    $data = $product -> fetchALL();
    return print_r(json_encode($data));
}

function getProductsbyCode($code){
    $product = myPDO -> query("SELECT * FROM products where code = '$code'");
    $data = $product -> fetch();
    return($data);
}

function delProd(){
    $del = myPDO->prepare("DELETE FROM products WHERE code =".$_REQUEST["code"]);
    $del->execute();
    return 'categoria deletada';

}
//function updateProduct($amount, $product_code)
function updateProduct($amount, $product_code)
{
    $product = getProductsbyCode($product_code);
    $newamount = $product["amount"] - $amount;
    $updateProduct = myPDO -> prepare("UPDATE PRODUCTS SET AMOUNT = {$newamount} WHERE CODE = {$product_code}");
    $updateProduct -> execute();
}