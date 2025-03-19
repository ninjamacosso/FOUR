import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Document } from '@/types/hr.types';
import { supabase } from '@/lib/supabase';
import {
  Download,
  File,
  FilePlus,
  FileText,
  FileX,
  Loader2,
  UploadCloud,
} from "lucide-react";

interface EmployeeDocumentsProps {
  employeeId: string;
}

const documentTypes = [
  { id: 'contract', name: 'Contrato de Trabalho' },
  { id: 'id_card', name: 'Documento de Identidade' },
  { id: 'tax_card', name: 'Cartão de Contribuinte' },
  { id: 'cv', name: 'Currículo' },
  { id: 'academic', name: 'Certificados Académicos' },
  { id: 'medical', name: 'Exames Médicos' },
  { id: 'bank', name: 'Comprovante Bancário' },
  { id: 'reference', name: 'Cartas de Referência' },
  { id: 'other', name: 'Outros Documentos' }
];

const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({ employeeId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  // Buscar documentos ao carregar o componente
  useEffect(() => {
    fetchDocuments();
  }, [employeeId]);
  
  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setDocuments(data || []);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os documentos do funcionário.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !documentName || !documentType) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // 1. Fazer upload do arquivo
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${employeeId}_${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('employee-documents')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      // 2. Obter URL pública do arquivo
      const { data: urlData } = supabase.storage
        .from('employee-documents')
        .getPublicUrl(filePath);
        
      // 3. Adicionar entrada na tabela de documentos
      const { data, error } = await supabase
        .from('documents')
        .insert([
          {
            employee_id: employeeId,
            name: documentName,
            type: documentType,
            url: urlData.publicUrl,
            size: selectedFile.size,
          },
        ])
        .select();
        
      if (error) throw error;
      
      // 4. Atualizar a lista de documentos
      setDocuments([...(data || []), ...documents]);
      
      toast({
        title: 'Sucesso',
        description: 'Documento enviado com sucesso!',
      });
      
      // Limpar formulário
      setSelectedFile(null);
      setDocumentName('');
      setDocumentType('');
      setShowUploadDialog(false);
      
      // Recarregar documentos
      fetchDocuments();
      
    } catch (error) {
      console.error('Erro ao fazer upload do documento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível fazer o upload do documento.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDelete = async (id: string) => {
    try {
      // Deletar da tabela
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Atualizar a lista de documentos
      setDocuments(documents.filter(doc => doc.id !== id));
      
      toast({
        title: 'Sucesso',
        description: 'Documento excluído com sucesso!',
      });
      
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o documento.',
        variant: 'destructive',
      });
    }
  };
  
  // Agrupar documentos por tipo
  const documentsByType = documents.reduce<Record<string, Document[]>>((acc, doc) => {
    const type = doc.type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(doc);
    return acc;
  }, {});
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Documentos do Funcionário</h3>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" />
              Adicionar Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Documento</DialogTitle>
              <DialogDescription>
                Faça upload de documentos importantes do funcionário.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documentName" className="text-right">
                  Nome
                </Label>
                <Input
                  id="documentName"
                  placeholder="Nome do documento"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documentType" className="text-right">
                  Tipo
                </Label>
                <select
                  id="documentType"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                >
                  <option value="">Selecione um tipo...</option>
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documentFile" className="text-right">
                  Arquivo
                </Label>
                <Input
                  id="documentFile"
                  type="file"
                  onChange={handleFileChange}
                  className="col-span-3"
                />
              </div>
              
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{selectedFile.name}</span>
                  <span className="text-xs">
                    ({Math.round(selectedFile.size / 1024)} KB)
                  </span>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Enviar
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : documents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground text-center mb-4">
              Nenhum documento encontrado para este funcionário.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(true)}
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Adicionar Documento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={Object.keys(documentsByType)[0] || 'all'}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {documentTypes.map((type) => 
              documentsByType[type.id] && (
                <TabsTrigger key={type.id} value={type.id}>
                  {type.name}
                </TabsTrigger>
              )
            )}
          </TabsList>
          
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead>Data de Upload</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                      {documentTypes.find(t => t.id === doc.type)?.name || doc.type}
                    </TableCell>
                    <TableCell>{Math.round(doc.size / 1024)} KB</TableCell>
                    <TableCell>
                      {new Date(doc.created_at).toLocaleDateString('pt-AO')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(doc.url, doc.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <FileX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {Object.entries(documentsByType).map(([type, docs]) => (
            <TabsContent key={type} value={type}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Data de Upload</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docs.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{Math.round(doc.size / 1024)} KB</TableCell>
                      <TableCell>
                        {new Date(doc.created_at).toLocaleDateString('pt-AO')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(doc.url, doc.name)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <FileX className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default EmployeeDocuments; 