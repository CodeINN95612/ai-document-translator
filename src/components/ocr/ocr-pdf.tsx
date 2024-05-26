import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 5,
    padding: 10,
    fontSize: 12,
    textAlign: "justify",
  },
});

export const OcrPdf = (props: { paragraphs: string[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {props.paragraphs.map((p, i) => (
        <View key={i} style={styles.section}>
          <Text>{p}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
