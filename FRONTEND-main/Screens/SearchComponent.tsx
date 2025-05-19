import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CenteredModal from "./CenteredModal";

interface SearchComponentProps {
  setSelectedOptions: (selected: string[]) => void;
  setSelectedDataOutside: (data: {
    medication: string;
    dose: string;
    frequency: string;
  }[]) => void;
}


const options = [   
                "Acetazolamide 250 mg",
                "Alprazolam 0.5 mg",
                "Alprazolam 2 mg",
                "Amisulpride 100 mg",
                "Amisulpride 400 mg",
                "Amitryptiline 10 mg",
                "Amitryptiline 25 mg",
                "Aripiprazole 10 mg",
                "Aripiprazole 15 mg",
                "Aripiprazole 30 mg",
                "Aripiprazole 5 mg",
                "Atomoxetine 10 mg",
                "Atomoxetine 18 mg",
                "Atomoxetine 25 mg",
                "Atomoxetine 40 mg",
                "Atomoxetine 60 mg",
                "Brivaracetam 100 mg",
                "Brivaracetam 25 mg",
                "Brivaracetam 50 mg",
                "Bromazepam 1.5 mg",
                "Bromazepam 3 mg",
                "Bromazepam 6 mg",
                "Bupropion 150 mg",
                "Carbamazepine 200 mg",
                "Carbamazepine 200 mg CR",
                "Carbamazepine 200 ml",
                "Carbamazepine 200 ml CR",
                "Carbamazepine 300 mg",
                "Carbamazepine 300 ml",
                "Carbamazepine 400 mg CR",
                "Carbamazepine 400 ml CR",
                "Carbamazepine 600 mg",
                "Carbamazepine 600 ml",
                "Cariprazine 1.5 mg",
                "Cariprazine 3 mg",
                "Cariprazine 4.5 mg",
                "Cariprazine 6 mg",
                "Cenobamate 100 mg",
                "Cenobamate 12.5 mg",
                "Cenobamate 150 mg",
                "Cenobamate 200 mg",
                "Cenobamate 50 mg",
                "Chlorpromazine 100 mg",
                "Chlorpromazine 25 mg",
                "Citalopram 20 mg",
                "Clobazam 10 mg",
                "Clobazam 5 mg",
                "Clomipramine 25 mg",
                "Clomipramine 75 mg",
                "Clonazepam 0.5 mg",
                "Clonazepam 2 mg",
                "Clozapine 100 mg",
                "Clozapine 25 mg",
                "Diazepam 10 mg",
                "Diazepam 5 mg",
                "Doxepin 10 mg",
                "Doxepine 50 mg",
                "Duloxetine 30 mg",
                "Duloxetine 60 mg",
                "Escitalopram 10 mg",
                "Escitalopram 15 mg",
                "Eslicarbazepine 800 mg",
                "Ethosuximide 250 mg",
                "Ethosuximide 250 ml",
                "Fluoxetine 20 mg",
                "Fluvoxamine 100 mg",
                "Gabapentin 100 mg",
                "Gabapentin 300 mg",
                "Gabapentin 400 mg",
                "Haldol 5 mg",
                "Imipramine 10 mg",
                "Imipramine 25 mg",
                "Lacosamide 100 mg",
                "Lacosamide 100 ml",
                "Lacosamide 200 mg",
                "Lacosamide 200 ml",
                "Lacosamide 50 mg",
                "Lacosamide 50 ml",
                "Lamotrigine 100 mg",
                "Lamotrigine 25 mg",
                "Lamotrigine 50 mg",
                "Levetiracetam 1000 mg",
                "Levetiracetam 250 mg",
                "Levetiracetam 500 mg",
                "Lithium 400 mg",
                "Lorazepam 1 mg",
                "Lorazepam 2 mg",
                "Methylphenidate (Concerta) 18 mg",
                "Methylphenidate (Concerta) 27 mg",
                "Methylphenidate (Concerta) 36 mg",
                "Methylphenidate (Concerta) 54 mg",
                "Methylphenidate (Ritalin) 10 mg",
                "Mirtazapine 30 mg",
                "Olanzapine 10 mg",
                "Olanzapine 20 mg",
                "Olanzapine 5 mg",
                "Oxcarbazepine 150 mg",
                "Oxcarbazepine 150 ml",
                "Oxcarbazepine 300 mg",
                "Oxcarbazepine 300 ml",
                "Oxcarbazepine 600 mg",
                "Oxcarbazepine 600 ml",
                "Paliperidone 3 mg",
                "Paliperidone 6 mg",
                "Paliperidone 9 mg",
                "Paroxetine 20 mg",
                "Paroxetine 25 mg",
                "Perampanel 10 mg",
                "Perampanel 12 mg",
                "Perampanel 2 mg",
                "Perampanel 4 mg",
                "Perampanel 6 mg",
                "Perampanel 8 mg",
                "Perphenazine 8 mg",
                "Phenobarbital 100 mg",
                "Phenobarbital 10 mg",
                "Phenytoin 100 mg",
                "Pimozide 4 mg",
                "Pregabalin 100 mg",
                "Pregabalin 150 mg",
                "Pregabalin 25 mg",
                "Pregabalin 75 mg",
                "Promethazine 25 mg",
                "Quetiapine 100 mg",
                "Quetiapine 25 mg",
                "Quetiapine 300 mg",
                "Quetiapine 400 mg",
                "Quetiapine 50 mg",
                "Risperidone 1 mg",
                "Risperidone 2 mg",
                "Risperidone 4 mg",
                "Sertraline 100 mg",
                "Sertraline 50 mg",
                "Topiramate 100 mg",
                "Topiramate 25 mg",
                "Topiramate 50 mg",
                "Valproic Acid 200 mg",
                "Valproic Acid 200 ml",
                "Valproic Acid 500 mg",
                "Valproic Acid 500 mg Chrono",
                "Valproic Acid 500 ml",
                "Valproic Acid 500 ml Chrono",
                "Venlafaxine 150 mg",
                "Venlafaxine 37.5 mg",
                "Venlafaxine 75 mg",
                "Vortioxetine 10 mg",
                "Vortioxetine 5 mg",
                "Vortioetine 20 mg",
                "Zolpidem 10 mg",
                "Zonisamide 100 mg",
                "Zonisamide 25 mg",
                "Zonisamide 50 mg",
                "Other"
];

const SearchComponent: React.FC<SearchComponentProps> = ({
  setSelectedOptions,
  setSelectedDataOutside,
}) => {
  const [modalValues, setModalValues] = useState({
  dose: "",
  frequency: "",
  medication: "",
});

  const [modalVisible, setModalVisible] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptionsLocal] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<
    { medication: string; dose: string; frequency: string }[]
  >([]);

  const [lastSelectedMedication, setLastSelectedMedication] =
    useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [sendOther, setSendOther] = useState(false);

  // Pour l'édition : on stocke l'index en édition (ou null si création)
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedDataOutside(selectedData);

    // Sync selectedOptions from selectedData meds
    setSelectedOptionsLocal(selectedData.map((d) => d.medication));
    setSelectedOptions(selectedData.map((d) => d.medication));
  }, [selectedData]);

  // Filter options based on search text (case-insensitive)
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSelection = (option: string) => {
  if (selectedOptions.includes(option)) {
    // suppression
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptionsLocal(updatedOptions);
    setSelectedOptions(updatedOptions);
    setSelectedData((prev) => prev.filter((item) => item.medication !== option));
  } else {
    // ajout - on vide les valeurs de la modale
    const updatedOptions = [...selectedOptions, option];
    setSelectedOptionsLocal(updatedOptions);
    setSelectedOptions(updatedOptions);

    setLastSelectedMedication(option);
    setEditIndex(null);
    setSendOther(option === "Other");

    // **Réinitialisation des valeurs à vide pour ajout**
    setModalValues({
      dose: "",
      frequency: "",
      medication: option,
    });

    setModalVisible(true);
  }
  setDropdownOpen(false);
  setSearchText("");
};

  const clearSelection = () => {
    setSelectedOptionsLocal([]);
    setSelectedOptions([]);
    setSelectedData([]);
    setSearchText("");
  };

  const handleSave = (
    doseOrEmpty: string | undefined,
    frequency: string,
    medName?: string
  ) => {
    if (!lastSelectedMedication && !medName) return;

    const medicationName = medName ?? lastSelectedMedication!;

    if (editIndex !== null) {
      // Edition : mettre à jour l'entrée existante
      setSelectedData((prev) => {
        const updated = [...prev];
        updated[editIndex] = { medication: medicationName, dose: doseOrEmpty ?? "", frequency };
        return updated;
      });
    } else {
      // Création : ajouter nouvelle entrée
      setSelectedData((prev) => [
        ...prev,
        { medication: medicationName, dose: doseOrEmpty ?? "", frequency },
      ]);
    }

    setModalVisible(false);
    setEditIndex(null);
  };

  // Ouvre la modale en mode édition avec valeurs pré-remplies
 const onEdit = (index: number) => {
  const item = selectedData[index];
  setLastSelectedMedication(item.medication);
  setEditIndex(index);
  setSendOther(item.medication === "Other");
  setModalValues({
    dose: item.dose,
    frequency: item.frequency,
    medication: item.medication,
  });
  setModalVisible(true);
};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownOpen(!isDropdownOpen)}
        activeOpacity={1}
      >
        <Ionicons name="search-outline" size={18} color="purple" style={styles.icon} />

        <TextInput
          style={styles.searchInput}
          placeholder="Select medication..."
          placeholderTextColor="#B766DA"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setDropdownOpen(true)}
          pointerEvents="auto"
        />

        <View style={styles.endButtons}>
          {selectedOptions.length > 0 && (
            <TouchableOpacity onPress={clearSelection} style={styles.button}>
              <Ionicons name="close-circle-outline" size={20} color="purple" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setDropdownOpen(!isDropdownOpen)}
            style={styles.button}
          >
            <Ionicons name="add-circle-outline" size={20} color="purple" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.selectedContainer}>
        {selectedData.map((item, index) => (
          <View key={index} style={styles.selectedTag}>
            <Text style={styles.selectedText}>
              {item.medication} | {item.dose} | {item.frequency}
            </Text>
            <TouchableOpacity onPress={() => onEdit(index)} style={{ marginRight: 8 }}>
              <Ionicons name="pencil-outline" size={18} color="purple" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleSelection(item.medication)}>
              <Ionicons name="close-outline" size={16} color="purple" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          <ScrollView nestedScrollEnabled style={styles.scrollContainer}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    toggleSelection(option);
                    setSearchText("");
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                  {selectedOptions.includes(option) && (
                    <Ionicons name="checkmark-outline" size={20} color="purple" />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={[styles.dropdownItemText, { textAlign: "center", paddingVertical: 10 }]}
              >
                No medications found
              </Text>
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setDropdownOpen(false)}
          >
            <Ionicons name="close-circle-outline" size={24} color="purple" />
          </TouchableOpacity>
        </View>
      )}

      <CenteredModal
  isVisible={modalVisible}
  onClose={() => {
    setModalVisible(false);
    setEditIndex(null);
  }}
  onSave={handleSave}
  other={sendOther} // ✅ pass the actual boolean value
  initialDose={modalValues.dose}
  initialFrequency={modalValues.frequency}
  initialMedication={modalValues.medication}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2D6FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#B766DA",
    width: "90%",
  },
  icon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#B766DA",
    paddingVertical: 0,
  },
  endButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  button: {
    marginLeft: 10,
  },
  dropdownMenu: {
    backgroundColor: "#F2D6FF",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B766DA",
    paddingVertical: 10,
    width: "90%",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderWidth: 5,
    borderColor: "#f2d1ff",
  },
  dropdownItemText: {
    color: "#B766DA",
    fontSize: 18,
  },
  selectedContainer: {
    width: "90%",
    marginTop: 10,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0b3ff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 5,
  },
  selectedText: {
    color: "#B766DA",
    marginRight: 5,
    fontSize: 16,
    flexShrink: 1,
  },
  scrollContainer: {
    maxHeight: 200,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});

export default SearchComponent;
