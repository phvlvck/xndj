/*
 ******************************************************
 * Professional Business Website - Email Sender
 ******************************************************
 * This PHP script handles the contact form submission
 * and sends an email to the company with the form data.
 ******************************************************
 */

<?php
// Set content type to JSON
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate form data
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

// Set recipient email address
$to = 'info@ourcompany.com';

// Set email subject
$email_subject = "رسالة جديدة من موقع شركتنا: $subject";

// Set email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Prepare email body
$email_body = "<html><body>";
$email_body .= "<h2>رسالة جديدة من موقع شركتنا</h2>";
$email_body .= "<p><strong>الاسم:</strong> $name</p>";
$email_body .= "<p><strong>البريد الإلكتروني:</strong> $email</p>";

if (!empty($phone)) {
    $email_body .= "<p><strong>الهاتف:</strong> $phone</p>";
}

$email_body .= "<p><strong>الموضوع:</strong> $subject</p>";
$email_body .= "<p><strong>الرسالة:</strong></p>";
$email_body .= "<p>$message</p>";
$email_body .= "</body></html>";

// Send email
$mail_sent = mail($to, $email_subject, $email_body, $headers);

// Check if email was sent successfully
if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'شكرًا لتواصلك معنا! سنعود إليك في أقرب وقت ممكن.']);
} else {
    echo json_encode(['success' => false, 'message' => 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقًا.']);
}
?>