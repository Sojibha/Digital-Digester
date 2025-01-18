// Handle form submission and code generation
const form = document.getElementById('wifi-form');
const codeContainer = document.getElementById('code-container');
const codeElement = document.getElementById('generated-code');
const copyButton = document.getElementById('copy-btn');

// Password visibility toggle
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle eye icon
  togglePassword.textContent = type === 'password' ? '\u{1F441}' : '\u{1F440}';
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const ssid = document.getElementById('ssid').value;
  const password = document.getElementById('password').value;

  const arduinoCode = `

 WiFi.begin("${ssid}", "${password}");
 #include <WiFi.h>
#include <LiquidCrystal_I2C.h>
#include "DHTesp.h"

// WiFi settings
 WiFi.begin("${ssid}", "${password}");
WiFiServer server(80);

// LCD and sensor settings
LiquidCrystal_I2C lcd(0x27, 16, 2);
DHTesp dht;

const int DHT_PIN = 17;
const int DATA_PIN = 32; // DOUT for HX710B
const int CLOCK_PIN = 33; // SCK for HX710B

const unsigned long DISPLAY_INTERVAL = 5000; 
unsigned long lastDisplayTime = 0;
int displayMode = 0;

void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  WiFi.begin(ssid, password);

  IPAddress local_IP(192, 168, 0, 114);
  IPAddress gateway(192, 168, 0, 1);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.config(local_IP, gateway, subnet);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
    lcd.clear();
    lcd.print("Connecting...");
  }

  Serial.println("WiFi connected.");
  lcd.clear();
  lcd.print("WiFi Connected");
  delay(2000);
  lcd.clear();

  dht.setup(DHT_PIN, DHTesp::DHT22);
  server.begin();
  lastDisplayTime = millis();

  pinMode(DATA_PIN, INPUT);
  pinMode(CLOCK_PIN, OUTPUT);
}

void loop() {
  handleClient();

  if (millis() - lastDisplayTime >= DISPLAY_INTERVAL) {
    lastDisplayTime = millis();
    displayMode = (displayMode + 1) % 3;
    lcd.clear();
    switch (displayMode) {
      case 0:
        lcd.print("IP: " + WiFi.localIP().toString());
        break;
      case 1:
        displayTemperatureAndHumidity();
        break;
      case 2:
        displayPressure();
        break;
    }
  }
}

void displayTemperatureAndHumidity() {
  TempAndHumidity data = dht.getTempAndHumidity();
  lcd.setCursor(0, 0);
  lcd.print("Temp: " + String(data.temperature) + " C");
  lcd.setCursor(0, 1);
  lcd.print("Hum: " + String(data.humidity) + " %");
}

void displayPressure() {
  long rawPressure = readHX710B();
  float pressure = rawPressure * 0.02; // Example conversion factor, calibrate as needed
  lcd.setCursor(0, 0);
  lcd.print("Pressure: ");
  lcd.print(pressure, 2);
  lcd.print(" kPa");
}

long readHX710B() {
  long result = 0;

  // Wait for the module to be ready
  while (digitalRead(DATA_PIN) == HIGH);

  // Read 24-bit data
  for (int i = 0; i < 24; i++) {
    digitalWrite(CLOCK_PIN, HIGH);
    result = (result << 1) | digitalRead(DATA_PIN);
    digitalWrite(CLOCK_PIN, LOW);
  }

  // Apply clock pulse to complete the conversion
  digitalWrite(CLOCK_PIN, HIGH);
  delayMicroseconds(1);
  digitalWrite(CLOCK_PIN, LOW);

  return result;
}

void handleClient() {
  WiFiClient client = server.available();
  if (client) {
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        if (c == '\\n') {
          if (currentLine.length() == 0) {
            sendSensorData(client);
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\\r') {
          currentLine += c;
        }
      }
    }
    client.stop();
    Serial.println("Client disconnected.");
  }
}

void sendSensorData(WiFiClient& client) {
  TempAndHumidity data = dht.getTempAndHumidity();
  long rawPressure = readHX710B();
  float pressure = rawPressure * 0.02; // Adjust conversion factor as needed

  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: application/json");
  client.println("Access-Control-Allow-Origin: *");
  client.println();
  client.printf("{\\"temperature\\": %.2f, \\"humidity\\": %.2f, \\"pressure\\": %.2f}", data.temperature, data.humidity, pressure);
}
`;

  codeElement.textContent = arduinoCode;
  codeContainer.style.display = 'block';
});

copyButton.addEventListener('click', function () {
  navigator.clipboard.writeText(codeElement.textContent)
    .then(() => alert('Code copied to clipboard!'))
    .catch(() => alert('Failed to copy code.'));
});
