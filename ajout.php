<?php

header("Access-Control-Allow-Origin: *");
$errors = [];
$data = [];

if (empty($_POST['nom'])) {
    $errors['nom'] = 'Le nom de la tache est nécessaire.';
}

if (empty($_POST['deadline'])) {
    $errors['deadline'] = 'la date est nécessaire.';
}


if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    $data['success'] = true;
    $data['message'] = 'Success!';
}

echo json_encode($data);

//On essaie de se connecter
try{
    $mysqlClient = new PDO("mysql:host=localhost;dbname=gestion_de_tache", 'root', '');
}
//Permet de détecter des erreurs, en cas de non connection le code ne se lance pas. 
catch(PDOException $e){
    echo "Erreur : " . $e->getMessage();
    die;
}

function addtask($nom, $deadline){
    global $mysqlClient;
    $sqlQuery1 = "INSERT INTO tache (nom, dates) VALUES ('$nom','$deadline')";
    $recipesStatement = $mysqlClient->prepare($sqlQuery1);
    $recipesStatement->execute();
  }

$nom=$_POST['nom'];
$deadline=$_POST['deadline'];
$date = date_create_from_format('d/m/Y', $deadline);
$date_sql = $date->format('Y-m-d');
addtask($nom, $date_sql);
?>
