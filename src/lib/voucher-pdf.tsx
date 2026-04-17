import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#f8f6f2",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1 solid #e0ddd6",
    paddingBottom: 20,
  },
  brand: {
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: "#111110",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: "#aaa89e",
  },
  title: {
    fontSize: 28,
    color: "#111110",
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 16,
    color: "#555550",
    marginBottom: 20,
  },
  codeContainer: {
    backgroundColor: "#111110",
    padding: 16,
    marginBottom: 24,
    textAlign: "center" as const,
  },
  codeLabel: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: "#aaa89e",
    marginBottom: 6,
  },
  code: {
    fontSize: 24,
    color: "#f8f6f2",
    letterSpacing: 4,
    fontFamily: "Courier",
  },
  detailsGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 16,
    marginBottom: 24,
  },
  detailItem: {
    width: "45%",
  },
  detailLabel: {
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#aaa89e",
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 12,
    color: "#111110",
  },
  restriction: {
    backgroundColor: "#f0ede6",
    padding: 16,
    marginTop: 16,
  },
  restrictionTitle: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#b8965a",
    marginBottom: 6,
  },
  restrictionText: {
    fontSize: 10,
    color: "#555550",
    lineHeight: 1.6,
  },
  footer: {
    marginTop: 30,
    paddingTop: 16,
    borderTop: "1 solid #e0ddd6",
  },
  footerText: {
    fontSize: 8,
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
