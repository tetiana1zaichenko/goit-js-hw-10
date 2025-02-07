function addLeadingZero(value) {
    const days = value.toString().padStart(3, '0');
    const hours = value.toString().padStart(2, '0');
    const mins = value.toString().padStart(2, '0');
    const secs = value.toString().padStart(2, '0');
    return console.log(`${days}:${hours}:${mins}:${secs}`);

}
