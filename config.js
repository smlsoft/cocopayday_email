let auth_token = '474H00IHHaGOQrzMKUtDV2HMCkf1gGij+FiA5yaj3s82dBQYphy+r3pYC7VAoCilDlEJ8+za30xXrnS5Rxy3tsIXngow899D/azx4mVQdV/IwPLohO8fqgvTWlxVPlhLagmgIuL+k6XYXjNDbFhd5wdB04t89/1O/w1cDnyilFU='

module.exports = {
    getauth_token:() => auth_token,
    setauth_token: newItem => auth_token = newItem,
}
