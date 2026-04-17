import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import path from "path";

const fontsDir = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Roboto",
  fonts: [
    { src: path.join(fontsDir, "Roboto-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Roboto-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontsDir, "Roboto-Bold.ttf"), fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: "Roboto",
    backgroundColor: "#f8f6f2",
  },
  header: {
    marginBottom: 14,
    borderBottom: "1 solid #e0ddd6",
    paddingBottom: 10,
  },
  brand: {
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: "#111110",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 7,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#aaa89e",
  },
  title: {
    fontSize: 22,
    color: "#111110",
    marginBottom: 4,
  },
  serviceLabel: {
    fontSize: 12,
    color: "#555550",
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: "#111110",
    padding: 10,
    marginBottom: 14,
    textAlign: "center" as const,
  },
  codeLabel: {
    fontSize: 7,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: "#aaa89e",
    marginBottom: 4,
  },
  code: {
    fontSize: 18,
    color: "#f8f6f2",
    letterSpacing: 4,
    fontFamily: "Roboto",
    fontWeight: 700,
  },
  detailsGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
    marginBottom: 12,
  },
  detailItem: {
    width: "45%",
  },
  detailLabel: {
    fontSize: 7,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#aaa89e",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 10,
    color: "#111110",
  },
  restriction: {
    backgroundColor: "#f0ede6",
    padding: 10,
    marginTop: 8,
  },
  restrictionTitle: {
    fontSize: 7,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#b8965a",
    marginBottom: 4,
  },
  restrictionText: {
    fontSize: 8,
    color: "#555550",
    lineHeight: 1.5,
  },
  footer: {
    marginTop: 14,
    paddingTop: 8,
    borderTop: "1 solid #e0ddd6",
  },
  footerText: {
    fontSize: 7,
    color: "#aaa89e",
    textAlign: "center" as const,
  },
});

interface VoucherPDFProps {
  code: string;
  serviceLabel: string;
  discountedPrice: number;
  buyerName: string;
  validFrom: string;
  validUntil: string;
}

export function VoucherPDF({
  code,
  serviceLabel,
  discountedPrice,
  buyerName,
  validFrom,
  validUntil,
}: VoucherPDFProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>Sherpaski</Text>
          <Text style={styles.subtitle}>Lyžařská škola · Karlov pod Pradědem</Text>
        </View>

        <Text style={styles.title}>Voucher</Text>
        <Text style={styles.serviceLabel}>{serviceLabel}</Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Kód voucheru</Text>
          <Text style={styles.code}>{code}</Text>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Jméno</Text>
            <Text style={styles.detailValue}>{buyerName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Cena</Text>
            <Text style={styles.detailValue}>{discountedPrice} Kč</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Platný od</Text>
            <Text style={styles.detailValue}>{formatDate(validFrom)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Platný do</Text>
            <Text style={styles.detailValue}>{formatDate(validUntil)}</Text>
          </View>
        </View>

        <View style={styles.restriction}>
          <Text style={styles.restrictionTitle}>Podmínky uplatnění</Text>
          <Text style={styles.restrictionText}>
            Voucher je platný pouze v pracovní dny (pondělí – pátek) od 11:00 do 14:00 hodin. Uplatnitelný ve Ski aréně Karlov pod Pradědem. Předložte kód při příchodu.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sherpa Ski School · Ski aréna Karlov pod Pradědem · wagnerski.cz
          </Text>
        </View>
      </Page>
    </Document>
  );
}
