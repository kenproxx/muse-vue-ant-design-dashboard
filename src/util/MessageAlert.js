
export function successMessage(message) {
    this.$message.success(message);

}

export function errorMessage(message) {
    this.$message.error(message);
    this.$message.success('This is a success message');

}

export function warningMessage(message) {
    this.$message.warning(message);
}

export function infoMessage(message) {
    this.$message.info(message);
}


