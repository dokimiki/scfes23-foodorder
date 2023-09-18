export type allergenContaminationStatus = "NotContains" | "Contamination" | "Contains";

export type allergensList = {
    ebi: allergenContaminationStatus;
    kani: allergenContaminationStatus;
    komugi: allergenContaminationStatus;
    kurumi: allergenContaminationStatus;
    milk: allergenContaminationStatus;
    peanut: allergenContaminationStatus;
    soba: allergenContaminationStatus;
    tamago: allergenContaminationStatus;
};
