<?php
// ดึงข้อมูลคำสั่งซื้อจาก Node API
$apiUrl = "http://localhost:3001/api/all-orders";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    die("เชื่อมต่อ API ไม่สำเร็จ: " . curl_error($ch));
}

curl_close($ch);

// แปลง JSON เป็น Array
$orders = json_decode($response, true);

if (!is_array($orders)) {
    die("รูปแบบข้อมูลจาก API ไม่ถูกต้อง");
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>Admin - Orders</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 40px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .order-items { font-size: 0.9rem; color: #555; }
    </style>
</head>
<body>
    <h1>ระบบจัดการคำสั่งซื้อ</h1>
    <table>
                    <thead>
                <tr>
                    <th>Order ID</th>
                    <th>ลูกค้า</th>
                    <th>Email</th> <!-- เพิ่ม -->
                    <th>ที่อยู่</th>
                    <th>รายการสินค้า</th>
                    <th>ยอดรวม</th>
                    <th>วันที่สั่งซื้อ</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($orders as $o): ?>
                <tr>
                    <td>#<?= $o['id'] ?></td>
                    <td><?= htmlspecialchars($o['first_name'] . ' ' . $o['last_name']) ?></td>
                    <td><?= htmlspecialchars($o['email']) ?></td> <!-- เพิ่ม -->
                    <td><?= htmlspecialchars($o['address'] . ', ' . $o['province']) ?></td>
                    <td class="order-items">
                        <ul>
                            <?php foreach ($o['items'] as $item): ?>
                                <li><?= $item['name'] ?> (x<?= $item['qty'] ?>) - <?= $item['price'] ?> บาท</li>
                            <?php endforeach; ?>
                        </ul>
                    </td>
                    <td><?= number_format($o['total'], 2) ?> บาท</td>
                    <td><?= $o['created_at'] ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>

    </table>
</body>
</html>