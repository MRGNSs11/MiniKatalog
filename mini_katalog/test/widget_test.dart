import 'package:flutter_test/flutter_test.dart';
import 'package:mini_katalog/main.dart';

void main() {
  testWidgets('Mini Katalog duman testi (smoke test)', (
    WidgetTester tester,
  ) async {
    // Kendi uygulamamızı test ortamında ayağa kaldırıyoruz
    await tester.pumpWidget(const MiniKatalogApp());

    // Ekranda 'Discover' başlığının başarıyla yüklendiğini doğruluyoruz
    expect(find.text('Discover'), findsOneWidget);
  });
}
