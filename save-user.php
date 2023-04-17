<?php
// 连接到 MySQL 数据库
$servername = "localhost";
$username = "your-username";
$password = "your-password";
$dbname = "user_registration";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取表单提交数据
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// 检查用户名是否已存在
$stmt = $conn->prepare("SELECT id FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo "Username is already taken.";
    $stmt->close();
    exit;
}
$stmt->close();

// 将用户信息插入数据库
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $password);
if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}
$stmt->close();

// 关闭数据库连接
$conn->close();
?>
