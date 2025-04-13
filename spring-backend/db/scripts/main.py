from transformers import pipeline

# Análisis de sentimiento
sentimiento = pipeline("sentiment-analysis")
resultado_sentimiento = sentimiento("Pedro nunca responde los mensajes ni colabora en las tareas.")
print("📊 Sentimiento:", resultado_sentimiento)

# Detección de entidades (como nombres, lugares, roles)
ner = pipeline("ner", grouped_entities=True)
resultado_entidades = ner("Pedro y Laura trabajan en el área web, pero Pedro fue muy conflictivo en el último proyecto.")
print("\n🧠 Entidades detectadas:")
for entidad in resultado_entidades:
    print(f" - {entidad['word']} ({entidad['entity_group']})")