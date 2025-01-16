#include <QApplication>
#include <QWidget>
#include <QVBoxLayout>
#include <QTextEdit>
#include <QPushButton>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlError>
#include <QSqlRecord>
#include <QDebug>

class MySqlWindow : public QWidget {
    Q_OBJECT

public:
    MySqlWindow(QWidget *parent = nullptr) : QWidget(parent) {
        // Create layout and widgets
        QVBoxLayout *layout = new QVBoxLayout(this);
        resultText = new QTextEdit(this);
        resultText->setReadOnly(true);
        QPushButton *connectButton = new QPushButton("Connect to MySQL", this);

        // Add widgets to layout
        layout->addWidget(resultText);
        layout->addWidget(connectButton);

        // Set layout
        setLayout(layout);

        // Connect button click to database connection
        connect(connectButton, &QPushButton::clicked, this, &MySqlWindow::connectToDatabase);
    }

private slots:
    void connectToDatabase() {
        // Create a database connection
        QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");

        // Set database parameters
        db.setHostName("localhost");       // Replace with your host
        db.setDatabaseName("testdb");      // Replace with your database name
        db.setUserName("root");            // Replace with your username
        db.setPassword("123");        // Replace with your password
        db.setPort(3306);                  // Default MySQL port

        // Open the database
        if (!db.open()) {
            resultText->setText("Failed to connect to database:\n" + db.lastError().text());
            return;
        }

        resultText->setText("Successfully connected to database!");

        // Example query: Fetch all rows from a table
        QSqlQuery query("SELECT * FROM your_table_name"); // Replace with your table name
        if (!query.exec()) {
            resultText->append("\nFailed to execute query:\n" + query.lastError().text());
            return;
        }

        // Process the query results
        while (query.next()) {
            QString row;
            for (int i = 0; i < query.record().count(); ++i) {
                row += query.value(i).toString() + " ";
            }
            resultText->append(row);
        }
    }

private:
    QTextEdit *resultText;
};

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    MySqlWindow window;
    window.setWindowTitle("Qt5 MySQL Example");
    window.resize(600, 400);
    window.show();

    return app.exec();
}

#include "main.moc"

