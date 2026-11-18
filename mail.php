
<?php

header('Content-Type: application/json; charset=UTF-8');

// Подключение PHPMailer
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

// Получение JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Проверка полученных данных
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['message' => 'Некорректные данные.']);
    exit;
}

$name = trim($data['name'] ?? '');
$phone = trim($data['phone'] ?? '');
$email = trim($data['email'] ?? '');
$policy = $data['policy'] ?? false;

// Проверка полей
if (
    mb_strlen($name) < 2 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    mb_strlen($phone) < 7 ||
    $policy !== true
) {
    http_response_code(400);
    echo json_encode(['message' => 'Проверьте правильность заполнения формы.']);
    exit;
}

// Защита HTML-письма от внедрения разметки
$nameSafe = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$phoneSafe = htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$emailSafe = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// Формирование письма
$title = 'Заявка с сайта';

$body =
    '<p>Имя: <strong>' . $nameSafe . '</strong></p>' .
    '<p>Телефон: <strong>' . $phoneSafe . '</strong></p>' .
    '<p>Email: <strong>' . $emailSafe . '</strong></p>';

// Отправка письма
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth = true;

    $mail->Host = 'smtp.mail.ru';
    $mail->Username = 'saifutdinov_vitalii@mail.ru';
    $mail->Password = '1Y0EjHAQ82YzVCBtfb1G';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('saifutdinov_vitalii@mail.ru', 'Заявка с сайта');
    $mail->addAddress('saifutdinov_vitalii@mail.ru');

    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();

    echo json_encode([
        'message' => 'Заявка успешно отправлена! Мы свяжемся с вами.'
    ]);

} catch (\Throwable $e) {
    error_log('Ошибка отправки письма: ' . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        'message' => 'Не удалось отправить заявку. Попробуйте позже.'
    ]);
}
</>
