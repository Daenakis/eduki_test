import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Postcard } from "./components/Postcard";
import { useEffect, useState } from "react";
import { nameCrop } from "./helpers/strings";
import { useSearchValue } from "./helpers/useSearchValue";
import { CustomModal } from "./components/CustomModal";

const axios = require("axios").default;

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //searchValue - search value with delay, searchInner - instant search value.
  const [searchValue, searchInner, setSearchInner] = useSearchValue("");
  const [modalData, setModalData] = useState<
    | undefined
    | {
        image: string;
        title: string;
        subtitle: string;
        price: string;
      }
  >(undefined);

  const getData = async () => {
    axios
      .get("https://api.eduki.com/api/v1/elastic", {
        params: {
          limit: 20,
          p: currentPage,
          q: searchValue.length > 2 ? searchValue : "",
          world: "de",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsVjZvNzJJQjd3cGdsRHhCIiwianRpIjoiNGFiZjA1MTI2NzNhY2ZkZTI5NTcxMGU3NjgxNjVjMmY1MWFjNzNlNTFkOWUwNWFkZmZjMjUyNzFkODY1ZDc4ZTYxM2FjZTNkNDYxNjhhZWYiLCJpYXQiOjE2Nzg2NjAxMjcuODIzNDcyLCJuYmYiOjE2Nzg2NjAxMjcuODIzNDc5LCJleHAiOjE3NDE4MTg1MjcuODIyNDUzLCJzdWIiOiIiLCJzY29wZXMiOlsicHVibGljIl19.uEaoxhTTfWqCoANRnNAwJaFU7Q0vz4K43XjYY3IwaXTeaydmcCgq1iPKpxrLsJ0Nrf8IPtyzYVFBiLDest-SkS76-Hbs75HMG66Wnl8WOyp5m8Uxc5KzAs6kzBwmhfr5b0TQEoLBVEEV5KSTJHWDTQlGlOJUwCRhoNHjqXJs9L4t_WOyKNE9y_Q2ED_z1dsEBNCl-HIiZ6c2Dci4pXZKs8-9jUpiaCga2tfjO6SvNqVkGle408p-9TRYD1BMTI1s7R1e8BbsTSo5FQJUgi6qUVapQCxu4WU3i3Wil1jjDKHqkSkafBl6VMX2ci-pj9fLKsUzuNSxCOUu9Jo8sbAE8e6VPOK3RxivIWN6BCX5sPBQIIWeS_bAjZ0vNBcubrJF4wwRwiUnSsgGKt3XnI9KhGsjaY5kmbqSnuQ6WdAvDkfvSA-HiX1xOCGmfQDXoGNrRR706bs7wlpqIbNF7lZZFjocfmiODif3rPj0QWf2amlSuCmlZzkyCoveNp43b2xYFQxcA1PlvAtchFTW6qA6vmqax7zoRfF1kQZg46P1pHimK3UchquAzeS4fALP0G93XQCprvN5iwNL9SuXgADlI-2QR1hWQ-i7RW2ElUhLt7PDQlEw5y49OLe5nhOMOxaSVRV8sbk5lX9CS28cJBezbg0ArLgFOv1nH88VNBZQKdM",
        },
      })
      .then((item) => {
        if (currentPage > 1) {
          setData([...data, ...item.data.data.items.materials]);
        } else {
          setData(item.data.data.items.materials);
        }
      });
  };

  const onSearchChange = (text: string) => {
    currentPage > 1 && setCurrentPage(1);
    setSearchInner(text);
  };

  useEffect(() => {
    getData();
  }, [searchValue, currentPage]);

  return (
    <>
    <SafeAreaView style={s.container}>
      <View style={s.searchCont}>
        <TextInput
          placeholder="Find item"
          onChangeText={onSearchChange}
          value={searchInner}
          style={s.input}
        />
      </View>
      <FlatList
        data={data}
        style={{ flex: 1, flexDirection: "column" }}
        numColumns={2}
        contentContainerStyle={s.contentCont}
        key={"flatlist"}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onEndReached={() => setCurrentPage(currentPage + 1)}
        onEndReachedThreshold={0.7}
        ItemSeparatorComponent={() => <View style={{ width: 1, height: 20 }} />}
        renderItem={({ item }) => (
          <Postcard
            image={item.firstPreviewImage.watermarked}
            title={nameCrop(item.title)}
            subtitle={item.author.details.publicName}
            price={item.price}
            onPress={(mData) => setModalData(mData)}
          />
        )}
      />
    </SafeAreaView>
    <CustomModal data={modalData} opened={!!modalData} onClose={() => setModalData(undefined)} />
    </>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCont: {
    width: "100%",
    paddingVertical: 40,
  },
  searchCont: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: "100%",
  },
  input: {
    padding: 10,
    height: 40,
    backgroundColor: "#D3D3D3",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "silver",
    color: "black",
  },
});
