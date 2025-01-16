#include <QApplication>
#include <QWidget>
#include <QVBoxLayout>
#include <QTextEdit>
#include <QPushButton>
#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QUrl>

class MyWindow : public QWidget {
    Q_OBJECT

public:
    MyWindow(QWidget *parent = nullptr) : QWidget(parent) {
        // Create layout and widgets
        QVBoxLayout *layout = new QVBoxLayout(this);
        responseText = new QTextEdit(this);
        responseText->setReadOnly(true);
        QPushButton *fetchButton = new QPushButton("Fetch Data", this);

        // Add widgets to layout
        layout->addWidget(responseText);
        layout->addWidget(fetchButton);

        // Set layout
        setLayout(layout);

        // Network manager
        manager = new QNetworkAccessManager(this);

        // Connect button click to fetch data
        connect(fetchButton, &QPushButton::clicked, this, &MyWindow::fetchData);

        // Connect network reply
        connect(manager, &QNetworkAccessManager::finished, this, &MyWindow::handleReply);
    }

private slots:
    void fetchData() {
        // Create the request
        QUrl url("http://localhost:3000/api/relationships?key=iamsab");
        QNetworkRequest request(url);

        // Send the request
        manager->get(request);
    }

    void handleReply(QNetworkReply *reply) {
        if (reply->error() == QNetworkReply::NoError) {
            // Read the reply and display it
            QString response = reply->readAll();
            responseText->setText(response);
        } else {
            // Display error message
            responseText->setText("Error: " + reply->errorString());
        }
        reply->deleteLater();
    }

private:
    QTextEdit *responseText;
    QNetworkAccessManager *manager;
};

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    MyWindow window;
    window.setWindowTitle("Qt5 HTTP Viewer");
    window.resize(600, 400);
    window.show();

    return app.exec();
}

#include "main.moc"

