function downloadReceipt(id) {
    // create a small dummy receipt text to download
    const content = [
        'University: UniERP',
        'Receipt ID: ' + id,
        'Date: ' + new Date().toLocaleDateString(),
        'Student: Jane Doe',
        '',
        '--- Payment details ---',
        'Item: Sample payment',
        'Amount: $' + (id.includes('2024-002') ? '8500' : id.includes('2023') ? '2400' : '500'),
        '',
        'Thank you for your payment.'
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = id + '.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// expose to global so inline onclick works
window.downloadReceipt = downloadReceipt;