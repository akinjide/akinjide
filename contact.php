<?php
  $name = $_POST['name'];
  $email = $_POST['email'];
  $msg = $_POST['message'];

  error_reporting(E_ALL);
  ini_set('display_errors', '1');

  // Array to hold validation errors and response data.
  $errors = array();
  $data = array();

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 604800');
    header('Access-Control-Allow-Headers: x-requested-with');
//     exit(0);
  }

  $nospace_name = trim($_POST['name']);
  $nospace_email = trim($_POST['email']);
  $nospace_message = trim($_POST['message']);

  if (empty($nospace_name))
    $errors['name'] = "Name field is required.";

  if (empty($nospace_email))
    $errors['email'] = "Email field is required.";

  if (empty($nospace_message))
    $errors['message'] = "I would love to see your message.";

  if (!empty($nospace_email) && !preg_match("^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$^", $nospace_email))
    $errors['bad_email'] = "Please enter a valid email address.";

  if (!empty($errors)) {
    $data['success'] = false;
    $data['errors']  = $errors;
  }
  else {
    $to = "r@akinjide.me";
    $subject = "Website Contact Form: " . $name;

    $headers  = "From: noreply@akinjide.me\r\n";
    $headers .= 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers .= "X-Priority: 1\r\n";
    $headers .= "Reply-To: " . $email;

    $message = '<html><body>';
    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
    $message .= "<tr><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
    // $message .= "Email: " . $email . "\n\n";
//     $message .= "Message: " . $msg;
    $message .= "<tr><td><strong>Message:</strong> </td><td>" . $msg . "</td></tr>";
    $message .= "</table>";
    $message .= "</body></html>";

    $mailSent = mail($to, $subject, $message, $headers);

    if (!$mailSent) {
      $errors['message'] .= "Something went wrong...Please try again later";
      $data['success'] = false;
      $data['errors']  = $errors;
    }
    else {
      $data['success'] = true;
      $data['message'] = "Thank you for contacting me, I\'ll get back to you soon!";
    }
  }

  // return all our data to an AJAX call
  echo json_encode($data);
?>