import { Kafka, Producer, Consumer, logLevel } from "kafkajs";

const CA = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUQodTpn1t8rFCuQeK0b868UfD9XowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjBiOWI3N2YtY2MyMi00OTNhLWFmM2EtNGE0MTAwYjFl
NDVkIFByb2plY3QgQ0EwHhcNMjQwODAxMTQxNDUwWhcNMzQwNzMwMTQxNDUwWjA6
MTgwNgYDVQQDDC9iMGI5Yjc3Zi1jYzIyLTQ5M2EtYWYzYS00YTQxMDBiMWU0NWQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANzyHLD0
S2DkO1kFS2Lk484AWEOKvF6u1CKVdlS4UGWeJtfStlesSyM2m407OrWBgUgdJevC
3lGO/DYata9cntLKwji/BvknnC0frX9FUjp55BsmhL0qU3OdyKQJTpOUtclgfNrP
w4RuJ6FJu99kuO1Z1kn8lm5agBC/Gq0aq6WLMzZodmjHPPdi1SIsSXOMPGLwdj+A
csqbh+EASwBAjBCS3nvU8dN6OrET0/wz8XZd1PVLOQkAJybg/787q2PnjG7Jq4on
g3Ae0o+onFliVGI/covx+EA7Mis7zxjKxW/i0g1oIAj5ml4Nz3jl47bAX/Kke0OP
L/I4Kgjh1Xv12RQtduNYHIQJDXPTwJ7fGkAyxhVfa4IQ2zKmToVnzM0GKae0rCZ+
Ono3lHQi9h1P5JcFQQ/17sGgU7dIG8Kg+K/8oDhy3O/eJq1zpl17CCD0z9sfEDmo
jMQk+vrdnRw1N/mudxJJHQSVK/RBA6Q4ArCvav2QIA76qrtO5/sTcEyNQQIDAQAB
oz8wPTAdBgNVHQ4EFgQUhQOnIkm/TjD05eCx/Mo9DX7vrPswDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAL8z1uhyiJnXFuHd
AcSknJNgKEZ23DlXDZ4qf78G1M2pV8iFosZr1EccwvnHR5nX5WUI3J096xxTL1zi
u60EzruHjn56TLXzz+aveXXHkqtWaIEv8hyn3YDokh9eZIuH/YyYF7CvMVKSw+Rp
6j21h7+UeQlKgK5G/rsuQr4U53ohqlwViVSjkXRZjO/7F9S6SLCGG7fkHLGJW1Ki
65+YYD4QX8QVhkUh0zRc44p0GUGZzICLm8/BCKbBljC3joWjvaRkJwv/UF95guq8
k8ouOtxDmZMHTpdAREDBkcR1Um6WlXpSdZ8GBz6sWP/ScAOdu/OvCAQVLFt+QP/J
wfTsBp+KgwZfKrFzRESEROqLuzBKusjPSMSJnLz6VJKsE0EIEvEXWbyF/hL8jIaR
q8o8JBU2pZDu1uzNpiI6p9zTrkxBNfKux3GSyYly0zkK9o03znWFquMRNMps19dW
GJxBrd536xBATaAfc5KFgNVXD//TyxP8+BSXuCqrySaomXPEtA==
-----END CERTIFICATE-----
`;

const SERVICE_KEY = `-----BEGIN PRIVATE KEY-----
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
R+Fuv+Y+isjUgfcCW72Rv0+Z
-----END PRIVATE KEY-----
`;

const SERVER_CERT = `-----BEGIN CERTIFICATE-----
MIIEYTCCAsmgAwIBAgIUfzR4LWkN+wcIXaAD+GDW39NtsPYwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjBiOWI3N2YtY2MyMi00OTNhLWFmM2EtNGE0MTAwYjFl
NDVkIFByb2plY3QgQ0EwHhcNMjQwODAxMTQxNTEyWhcNMjYxMDMwMTQxNTEyWjA/
MRcwFQYDVQQKDA5rYWZrYS0xYTM5ZTlkNDERMA8GA1UECwwIdTljMnEwcjUxETAP
BgNVBAMMCGF2bmFkbWluMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA
2TlbYMDJW1y3QBWy6NU3Tz6ol6fnx5XbFZu6ivWQDWXXuCdSoRLOkqTK+L9wkrR2
0tOzd0JE1DDsPIOGpJD0yabimrJcxAs14FueSwBNXhJr+pwGC4vQfT5Oan6cDOjb
R7j1maDePhSjd0tlqs3lBeEDQKbskP3YO40UTApvPwLDL/BGXkWmjrv37AMvudwl
UBW9cmcTsR4GW4Uz5SVpwtuYiVWZktNn/X+zgJhQemhRj/D0AtJKhRk7k61sjk2m
/imEOF2Vehu9TzHkbG0KaCYm5pLeaXCIuxIitmDJkDyrgYCoAm5CytuNu11+PMz7
/RNRx1Xg2Av1Abc+ULwfFZPUyzvUL1t7soABtmIp5ncezY74nAD55303uxrgDK5b
YcnBaT3b+avnpRi5HXA3H/rDKk8FRRiARoPF2wWA2xYtXfpjqcQm+J0BqGfQi2w4
pxc1DDjw+OtPMLDr6QW/w3xLbEAkCdKF9mWphbqBxZOVIvK/GHhk0erbH8FgGFzf
AgMBAAGjWjBYMB0GA1UdDgQWBBS6f8AshWUcHPnpa6uQZclLvsIXNTAJBgNVHRME
AjAAMAsGA1UdDwQEAwIFoDAfBgNVHSMEGDAWgBSFA6ciSb9OMPTl4LH8yj0Nfu+s
+zANBgkqhkiG9w0BAQwFAAOCAYEAZsTufLLYtTlbZ3diey56Mn80hWitHM9KvzrJ
OiP3u4SiwauNsx3ZYnbA8gJqjZWGRWAUiUJ+t/xW+efwPpi1nntloW0gsf5fcOE5
V2LcVqs5Rnc1if5VsftlyabG0MlOSdTPkctmVxEJQQ1p0gkTDg5z9kcYSf8+s5Wm
p5b/DuRaMYeXZlPuw+UiW7dDEazyIP/3e3e4DRaDAAP2RshCs8stW66MfPVa2V59
M5AwSuiO28ctTvcO/qdP24yWE6jiizlp/KARGouHmri6Z2+ivwmopTfgDk3poP1N
OnlVxIONhiUmToQgqTdesS5maLYwxtzt0QEMlyy0gSClRgMT2Cd9kBWHJwQBBxS9
3hi/8okwxQex1Jyd+Q5GW51zMbNRIojACNCP89PWSKH4U/GpQvRupg5af1LqCqt+
gQUFOqL6HZjxMZTxh6iu1orKAoWgrrIV/URrtdX+vC2Ugm22Uh5VfLu9vLISNZdW
aoxmRnoLUZAaJAMytBzAx7AhPQw/
-----END CERTIFICATE-----
`;

const sslOptions = {
  rejectUnauthorized: true,
  ca: [CA],
  // key: SERVICE_KEY,
  // cert: SERVER_CERT,
};

const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String("kafka-1a39e9d4-koolathaflah-2e70.e.aivencloud.com:16270")],
  ssl: sslOptions, // removed this much code for development

  sasl: {
    mechanism: "scram-sha-256",
    username: "avnadmin",
    password: "AVNS_lPWnu6w9F3X96tBhwyD",
  },
  logLevel: logLevel.WARN,
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: String(process.env.NOTIFICATION_SERVICE_KAFKA_CONSUMER_GROUP_ID),
});
